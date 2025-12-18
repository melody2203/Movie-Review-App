import os
import django
import random
from datetime import timedelta
from django.utils import timezone

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
# Use distinct import to avoid confusion if needed, assuming reviews app has the main Movie
from reviews.models import Movie, Review, ReviewLike

User = get_user_model()

def create_test_data():
    print("Creating test data...")
    
    # Create test user
    user, created = User.objects.get_or_create(
        username='testuser',
        defaults={
            'email': 'test@example.com',
            'first_name': 'Test',
            'last_name': 'User'
        }
    )
    if created:
        user.set_password('testpass123')
        user.save()
        print(f"✅ Created user: {user.username}")
    else:
        print(f"✅ User already exists: {user.username}")
    
    genres = ['Action', 'Horror', 'Comedy', 'Adventure', 'Romance', 'Sci-Fi', 'Drama']
    
    # Template for generating movies/series
    def generate_content(title_prefix, genre, count, is_series=False):
        for i in range(1, count + 1):
            title = f"{title_prefix} {genre} {i}"
            desc = f"This is a thrilling {genre.lower()} {'series' if is_series else 'movie'} about events in episode {i}."
            movie_type = 'Series' if is_series else 'Movie'
            
            movie, created = Movie.objects.get_or_create(
                title=title,
                defaults={
                    'description': desc,
                    'release_date': timezone.now().date() - timedelta(days=random.randint(100, 2000)),
                    'duration': random.randint(30, 60) if is_series else random.randint(80, 180),
                    'genre': genre,
                    'director': f"Director {i}",
                    'cast': f"Actor A, Actor B{i}",
                    'type': movie_type
                }
            )
            if created:
                print(f"✅ Created {movie_type}: {movie.title}")
            else:
                 # Update type if it exists but might be wrong (e.g. from previous run)
                 if movie.type != movie_type:
                    movie.type = movie_type
                    movie.save()
                    print(f"🔄 Updated type for: {movie.title}")

            # Create random reviews
            if created or Review.objects.filter(movie=movie).count() == 0:
                Review.objects.create(
                    movie=movie,
                    user=user,
                    rating=random.randint(3, 5),
                    content=f"I really liked this {genre} {movie_type.lower()}! It was worth watching."
                )
                print(f"   + Added review for {title}")

    # Generate 5 Movies per genre
    for genre in genres:
        generate_content("The Great", genre, 5, is_series=False)

    # Generate 2 Series per genre (just to have them)
    for genre in genres:
        generate_content("The Chronicles of", genre, 2, is_series=True)
    
    print("\n🎉 Test data creation completed!")
    print(f"📊 Summary:")
    print(f"   - Users: {User.objects.count()}")
    print(f"   - Movies/Series: {Movie.objects.count()}")
    print(f"   - Reviews: {Review.objects.count()}")

if __name__ == '__main__':
    create_test_data()
