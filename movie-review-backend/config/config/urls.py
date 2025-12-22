from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({"message": "Welcome to the Movie Review API"})

urlpatterns = [
    path('', api_root),                       # Root welcome
    path('admin/', admin.site.urls),          # Admin panel
    path('api/auth-token/', obtain_auth_token, name='api_token_auth'),  # Token auth
    path('api/users/', include('config.users.urls')),      # users app
    path('api/movies/', include('config.movies.urls')),   # movies app
    path('api/reviews/', include('config.reviews.urls')),  # reviews app
]