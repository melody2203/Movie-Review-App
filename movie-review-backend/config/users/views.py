from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer, UserSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Create token for the new user
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'token': token.key
        }, status=status.HTTP_201_CREATED)

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Temporarily allow any for testing
    
    def get_object(self):
        return self.request.user

import random
import string
from django.core.mail import send_mail
from django.conf import settings
from .models import PasswordResetCode
from .serializers import PasswordResetRequestSerializer, PasswordResetConfirmSerializer

class RequestResetCodeView(generics.GenericAPIView):
    serializer_class = PasswordResetRequestSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        
        # Generate 6-digit code
        code = ''.join(random.choices(string.digits, k=6))
        
        # Save code (update existing or create new)
        PasswordResetCode.objects.filter(email=email).delete()
        PasswordResetCode.objects.create(email=email, code=code)
        
        # Send Email
        subject = 'Your Movie App Password Reset Code'
        message = f'Your 6-digit verification code is: {code}\nThis code expires in 10 minutes.'
        
        try:
            send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [email])
            return Response({"message": "Reset code sent to your email."}, status=status.HTTP_200_OK)
        except Exception as e:
            # Fallback for console logging if email fails
            print(f"FAILED TO SEND EMAIL. CODE FOR {email} IS: {code}")
            return Response({"message": "Code generated (Check console/logs)."}, status=status.HTTP_200_OK)

class ResetPasswordView(generics.GenericAPIView):
    serializer_class = PasswordResetConfirmSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.validated_data['email']
        code = serializer.validated_data['code']
        new_password = serializer.validated_data['new_password']
        
        # Verify code
        reset_entry = PasswordResetCode.objects.filter(email=email, code=code).first()
        
        if not reset_entry:
            return Response({"error": "Invalid code or email."}, status=status.HTTP_400_BAD_REQUEST)
        
        if reset_entry.is_expired():
            reset_entry.delete()
            return Response({"error": "Code has expired."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Reset Password
        user = User.objects.get(email=email)
        user.set_password(new_password)
        user.save()
        
        # Cleanup
        reset_entry.delete()
        
        return Response({"message": "Password updated successfully."}, status=status.HTTP_200_OK)
