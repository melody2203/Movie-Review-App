
import urllib.request
import concurrent.futures

urls = {
    "Mad Max: Fury Road": "https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg",
    "The Dark Knight": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", 
    "Inception": "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    "John Wick": "https://image.tmdb.org/t/p/w500/fZPSd99A8c3Kz2jYfD2eI8Vl0YN.jpg",
    "The Mandalorian": "https://image.tmdb.org/t/p/w500/eU0P7P3tqTMn0YgEZWNn3j6aBpm.jpg",
    "The Grand Budapest Hotel": "https://image.tmdb.org/t/p/w500/fYlZ3oJ4A2Q1qG9Q2sW8S1o2c3h.jpg",
    "Superbad": "https://image.tmdb.org/t/p/w500/axFmCRNQsW6Bto8XuJKo08MPPV5.jpg",
    "Brooklyn Nine-Nine": "https://image.tmdb.org/t/p/w500/zFwB3l44E5vX4Cj4sF4vj0w2v2u.jpg",
    "The Office": "https://image.tmdb.org/t/p/w500/qW1oT9sC5tN6KgoQ4xJ5tN0l1x1.jpg",
    "Ted Lasso": "https://image.tmdb.org/t/p/w500/h0yFh0R8D6wX0yF0g4r6t9J6k8j.jpg",
    "The Shining": "https://image.tmdb.org/t/p/w500/AdKA2F1SzYPhSZdEbjH1Zh75UVQ.jpg",
    "Get Out": "https://image.tmdb.org/t/p/w500/oUmmY7QWWn7OhKlcPOnirHJpP1F.jpg",
    "Stranger Things": "https://image.tmdb.org/t/p/w500/z2yahl2uefxDCl0nogcRBstwruJ.jpg", 
    "Hereditary": "https://image.tmdb.org/t/p/w500/u0rV8xP5E5fK8yJ8Z4Z4V6j2t7f.jpg",
    "The Haunting of Hill House": "https://image.tmdb.org/t/p/w500/vJgL1Vj6W8W3g9j6j5w1f8z0x0d.jpg",
    "Interstellar": "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    "Dune": "https://image.tmdb.org/t/p/w500/8b54J6gCM27QodPBoBWAcC9JHnd.jpg",
    "Black Mirror": "https://image.tmdb.org/t/p/w500/he609rnU3tiwBjRklKNa4n2jQSd.jpg", 
    "The Matrix": "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    "Severance": "https://upload.wikimedia.org/wikipedia/en/e/e0/Severance_poster.jpg",
    "Breaking Bad": "https://image.tmdb.org/t/p/w500/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    "The Godfather": "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    "Succession": "https://upload.wikimedia.org/wikipedia/en/2/22/Succession_poster.jpg",
    "Parasite": "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    "The Crown": "https://image.tmdb.org/t/p/w500/4InrdamBEM31unNiuEHGYTPX1e2.jpg",
}

def check_url(name, url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            return name, url, response.getcode()
    except Exception as e:
        return name, url, str(e)

with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
    results = list(executor.map(lambda p: check_url(*p), urls.items()))

for name, url, status in results:
    print(f"{'✅' if status == 200 else '❌'} {name}: {status}")
