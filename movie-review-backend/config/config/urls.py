from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({"message": "Welcome to the Movie Review API"})

urlpatterns = [
    path('', api_root),
    path('admin/', admin.site.urls),
    path('api/auth-token/', obtain_auth_token, name='api_token_auth'),
    path('api/users/', include('users.urls')),
    path('api/movies/', include('reviews.urls')),
    path('api/reviews/', include('reviews.urls')),
]