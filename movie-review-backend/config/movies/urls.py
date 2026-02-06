from django.urls import path
from . import views
from reviews.views import MovieReviewList

urlpatterns = [
    path('', views.MovieList.as_view(), name='movie-list'),
    path('<int:pk>/', views.MovieDetail.as_view(), name='movie-detail'),
    path('<int:movie_id>/reviews/', MovieReviewList.as_view(), name='movie-reviews'),
]