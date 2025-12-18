import os
import sys

# Add current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
import django
django.setup()

from reviews.models import Movie

# Quick add 2 movies
Movie.objects.all().delete()

m1 = Movie.objects.create(
    title='The Shawshank Redemption', 
    description='Two imprisoned men bond over the years', 
    release_date='1994-09-23', 
    duration=142, 
    genre='Drama', 
    director='Frank Darabont', 
    cast='Tim Robbins, Morgan Freeman'
)

m2 = Movie.objects.create(
    title='The Godfather', 
    description='Crime dynasty story', 
    release_date='1972-03-24', 
    duration=175, 
    genre='Drama', 
    director='Francis Coppola', 
    cast='Marlon Brando, Al Pacino'
)

print(f"✅ Added {Movie.objects.count()} movies to database!")