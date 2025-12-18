
import os
import django
import random
from datetime import timedelta
from django.utils import timezone

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from reviews.models import Movie, Review, ReviewLike
from django.contrib.auth import get_user_model

User = get_user_model()

def create_real_data():
    print("🗑️  Cleaning old data...")
    ReviewLike.objects.all().delete()
    Review.objects.all().delete()
    Movie.objects.all().delete()
    # Optional: Clean users if needed, but keeping testuser is good
    
    # Ensure test user exists
    user, created = User.objects.get_or_create(username='testuser')
    if created:
        user.set_password('testpass123')
        user.save()
        print("👤 Created 'testuser'")

    # Real Data Dictionary
    # Format: 'Genre': [ (Title, Description, PosterURL, Type, Director, Cast) ]
    # Using reliable placeholder for posters with custom text to ensure they always load
    # Or illustrative URLs if possible. Let's use high quality placehold.co with text.
    
    def get_poster(title):
        # A nice dark styled poster placeholder
        clean_title = title.replace(" ", "+")
        return f"https://placehold.co/300x450/1a1a1a/ffffff.png?text={clean_title}&font=playfair-display"

    movies_data = {
        'Action': [
            ("Mad Max: Fury Road", "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.", "Movie", "George Miller", "Tom Hardy, Charlize Theron"),
            ("The Dark Knight", "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", "Movie", "Christopher Nolan", "Christian Bale, Heath Ledger"),
            ("Inception", "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", "Movie", "Christopher Nolan", "Leonardo DiCaprio, Joseph Gordon-Levitt"),
            ("John Wick", "An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.", "Movie", "Chad Stahelski", "Keanu Reeves, Michael Nyqvist"),
            ("The Mandalorian", "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.", "Series", "Jon Favreau", "Pedro Pascal, Carl Weathers"),
        ],
        'Comedy': [
            ("The Grand Budapest Hotel", "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.", "Movie", "Wes Anderson", "Ralph Fiennes, F. Murray Abraham"),
            ("Superbad", "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.", "Movie", "Greg Mottola", "Jonah Hill, Michael Cera"),
            ("Brooklyn Nine-Nine", "Comedy series following the exploits of Det. Jake Peralta and his diverse, lovable colleagues as they police the NYPD's 99th Precinct.", "Series", "Dan Goor", "Andy Samberg, Stephanie Beatriz"),
            ("The Office", "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.", "Series", "Greg Daniels", "Steve Carell, John Krasinski"),
            ("Ted Lasso", "American college football coach Ted Lasso heads to London to manage AFC Richmond, a struggling English Premier League soccer team.", "Series", "Bill Lawrence", "Jason Sudeikis, Brett Goldstein"),
        ],
        'Horror': [
            ("The Shining", "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from the past and of the future.", "Movie", "Stanley Kubrick", "Jack Nicholson, Shelley Duvall"),
            ("Get Out", "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.", "Movie", "Jordan Peele", "Daniel Kaluuya, Allison Williams"),
            ("Stranger Things", "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.", "Series", "The Duffer Brothers", "Millie Bobby Brown, Finn Wolfhard"),
            ("Hereditary", "A grieving family is haunted by tragic and disturbing occurrences.", "Movie", "Ari Aster", "Toni Collette, Alex Wolff"),
            ("The Haunting of Hill House", "Flashing between past and present, a fractured family confronts the haunting memories of their old home and the terrifying events that drove them from it.", "Series", "Mike Flanagan", "Michiel Huisman, Carla Gugino"),
        ],
        'Sci-Fi': [
            ("Interstellar", "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", "Movie", "Christopher Nolan", "Matthew McConaughey, Anne Hathaway"),
            ("Dune", "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.", "Movie", "Denis Villeneuve", "Timothée Chalamet, Rebecca Ferguson"),
            ("Black Mirror", "An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide.", "Series", "Charlie Brooker", "Daniel Lapaine, Hannah John-Kamen"),
            ("The Matrix", "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.", "Movie", "Lana Wachowski", "Keanu Reeves, Laurence Fishburne"),
            ("Severance", "Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives. When a mysterious colleague appears outside of work, it begins a journey to discover the truth about their jobs.", "Series", "Dan Erickson", "Adam Scott, Zach Cherry"),
        ],
        'Drama': [
            ("Breaking Bad", "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.", "Series", "Vince Gilligan", "Bryan Cranston, Aaron Paul"),
            ("The Godfather", "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.", "Movie", "Francis Ford Coppola", "Marlon Brando, Al Pacino"),
            ("Succession", "The Roy family is known for controlling the biggest media and entertainment company in the world. However, their world changes when their father steps down from the company.", "Series", "Jesse Armstrong", "Brian Cox, Jeremy Strong"),
            ("Parasite", "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.", "Movie", "Bong Joon Ho", "Song Kang-ho, Lee Sun-kyun"),
            ("The Crown", "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.", "Series", "Peter Morgan", "Claire Foy, Olivia Colman"),
        ]
    }

    total_created = 0
    
    for genre, movies in movies_data.items():
        print(f"Creating {genre} content...")
        for data in movies:
            title, desc, m_type, director, cast = data
            movie = Movie.objects.create(
                title=title,
                description=desc,
                genre=genre,
                type=m_type,
                director=director,
                cast=cast,
                duration=random.randint(40, 60) if m_type == 'Series' else random.randint(90, 180),
                release_date=timezone.now().date() - timedelta(days=random.randint(100, 5000)),
                poster=get_poster(title)
            )
            
            # Create a review
            Review.objects.create(
                movie=movie,
                user=user,
                user_name=user.username,
                rating=random.randint(3, 5),
                content=f"I really enjoyed watching {title}. The { 'visuals were stunning' if genre in ['Sci-Fi', 'Action'] else 'story was compelling' }!"
            )
            total_created += 1

    print(f"✅ Successfully created {total_created} movies/series with reviews!")

if __name__ == '__main__':
    create_real_data()
