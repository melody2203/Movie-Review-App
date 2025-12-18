from django.conf import settings
from rest_framework import serializers
from .models import Movie, Review

# Import your custom user model safely
try:
    from users.models import CustomUser
    UserModel = CustomUser
except ImportError:
    from django.contrib.auth.models import User
    UserModel = User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['id', 'username', 'email']

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['id', 'movie', 'user', 'rating', 'content', 'created_at', 'updated_at', 'likes_count', 'is_liked']
        read_only_fields = ['id', 'created_at', 'updated_at', 'user', 'likes_count', 'is_liked']

    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(user=request.user).exists()
        return False

class MovieSerializer(serializers.ModelSerializer):
    average_rating = serializers.ReadOnlyField()
    total_reviews = serializers.ReadOnlyField()
    
    class Meta:
        model = Movie
        fields = '__all__'