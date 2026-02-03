from rest_framework import generics, permissions, filters
from reviews.models import Movie
from reviews.serializers import MovieSerializer
from django.db.models import Q

class MovieList(generics.ListCreateAPIView):
    serializer_class = MovieSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Movie.objects.all()
        genre = self.request.query_params.get('genre')
        search = self.request.query_params.get('search')
        
        if genre:
            queryset = queryset.filter(genre__iexact=genre)
        
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | 
                Q(description__icontains=search)
            )
            
        return queryset

class MovieDetail(generics.RetrieveAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
