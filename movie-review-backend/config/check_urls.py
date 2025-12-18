

import urllib.request

poster_map = {
    "Mad Max: Fury Road": "https://image.tmdb.org/t/p/original/8tZYtuWezpScKdJ2nlW023fUb91.jpg",
    "The Dark Knight": "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg", 
    "Inception": "https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    "John Wick": "https://image.tmdb.org/t/p/original/fZPSd91yGE9fCcCe6OoQr6E3McT.jpg",
    "The Mandalorian": "https://image.tmdb.org/t/p/original/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg",
    "The Grand Budapest Hotel": "https://image.tmdb.org/t/p/original/eWdyYQreja6JGCzxE3SmIXUA88b.jpg",
    "Superbad": "https://image.tmdb.org/t/p/original/ek8e8txUyUwd2BNqj6lFEerJnhq.jpg",
    "Brooklyn Nine-Nine": "https://image.tmdb.org/t/p/original/30erzlzIBILEsXuCfMJr04SGcTq.jpg",
    "The Office": "https://image.tmdb.org/t/p/original/7DWK2f52kfmQkUj8HWq4yqI6a34.jpg",
    "Ted Lasso": "https://image.tmdb.org/t/p/original/93Fm8kjsV87d8P20c7m0B9O8d28.jpg",
    "The Shining": "https://image.tmdb.org/t/p/original/x2q24GZ0A35aR177eGg2kM5c1qf.jpg",
    "Get Out": "https://image.tmdb.org/t/p/original/tFXcEccSQMf3lfhfXOQ95rQR6oA.jpg",
    "Stranger Things": "https://image.tmdb.org/t/p/original/49WJfeN0moxb9IPfGn8AIqMGskD.jpg", 
    "Hereditary": "https://image.tmdb.org/t/p/original/p9fopCfrOjbAF4X4D03F1k7qV7C.jpg",
    "The Haunting of Hill House": "https://image.tmdb.org/t/p/original/3is5q4jhWp514GWZ50sXfgs38fa.jpg",
    "Interstellar": "https://image.tmdb.org/t/p/original/gEU2QniL6C8ztLh5f9F42tJ93u.jpg",
    "Dune": "https://image.tmdb.org/t/p/original/d5NxsKlXo0qyCIkg5J03No22vMo.jpg",
    "Black Mirror": "https://image.tmdb.org/t/p/original/7Ru9F2bWcWd0C6w4w4f45w4d5.jpg", 
    "The Matrix": "https://image.tmdb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    "Severance": "https://image.tmdb.org/t/p/original/l4w80h05RjGgE8f7m538f45a2.jpg",
    "Breaking Bad": "https://image.tmdb.org/t/p/original/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    "The Godfather": "https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    "Succession": "https://image.tmdb.org/t/p/original/7T5x4f4345345345.jpg",
    "Parasite": "https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    "The Crown": "https://image.tmdb.org/t/p/original/21D53923L4jL5jL5j5.jpg",
}

print(f"{'Title':<30} | {'Status':<6}")
print("-" * 40)

bad_urls = []

for title, url in poster_map.items():
    try:
        req = urllib.request.Request(url, method='HEAD')
        req.add_header('User-Agent', 'Mozilla/5.0')
        with urllib.request.urlopen(req, timeout=5) as response:
            status = response.status
            print(f"{title[:28]:<30} | {status:<6}")
            if status != 200:
                bad_urls.append((title, status))
    except Exception as e:
        print(f"{title[:28]:<30} | ERR: {e}")
        bad_urls.append((title, f'ERR: {e}'))

if bad_urls:
    print("\nBad URLs:")
    for b in bad_urls:
        print(b)
else:
    print("\nAll URLs OK!")
