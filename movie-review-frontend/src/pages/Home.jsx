import { useEffect, useState } from 'react';
import { getMovies } from '../api/movies';
import { Link } from 'react-router-dom';

const genres = ['Action', 'Horror', 'Comedy', 'Sci-Fi', 'Drama'];

const Home = () => {
    const [categories, setCategories] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllMovies = async () => {
            try {
                const categoryData = {};

                // Fetch movies for each genre distinctively
                const promises = genres.map(async (genre) => {
                    const data = await getMovies({ genre });
                    return { genre, movies: data.results || data };
                });

                const results = await Promise.all(promises);
                results.forEach(({ genre, movies }) => {
                    categoryData[genre] = movies;
                });

                setCategories(categoryData);
            } catch (error) {
                console.error("Failed to fetch movies", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllMovies();
    }, []);

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-main)' }}>Loading movies...</div>;

    return (
        <div style={{ padding: '0 0 5rem 0' }}>
            {/* Hero Section */}
            <div style={{
                padding: '6rem 2rem 4.5rem',
                textAlign: 'center',
                background: 'linear-gradient(to bottom, var(--bg-surface), var(--bg-deep))',
                marginBottom: '4rem',
                borderBottom: '1px solid rgba(139, 90, 43, 0.1)'
            }}>
                <h1 style={{
                    fontSize: '4.5rem',
                    marginBottom: '1rem',
                    background: 'linear-gradient(to right, var(--text-main), var(--accent))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: '900',
                    letterSpacing: '-2px'
                }}>
                    Explore Movies & Series
                </h1>
                <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}>
                    A curated selection of cinematic excellence, ranging from heart-pounding action to soul-stirring drama.
                </p>
            </div>

            <div style={{ padding: '0 4.5rem' }}>
                {genres.map(genre => (
                    categories[genre] && categories[genre].length > 0 && (
                        <div key={genre} style={{ marginBottom: '6rem' }}>
                            <h2 style={{
                                marginBottom: '2rem',
                                paddingBottom: '0.75rem',
                                borderBottom: '1px solid rgba(139, 90, 43, 0.2)',
                                display: 'inline-block',
                                color: 'var(--accent)',
                                fontSize: '1.8rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em'
                            }}>
                                {genre}
                            </h2>
                            <div style={{
                                display: 'flex',
                                overflowX: 'auto',
                                gap: '2rem',
                                paddingBottom: '1.5rem',
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'var(--bg-surface) transparent'
                            }}>
                                {categories[genre].map(movie => (
                                    <div key={movie.id} style={{
                                        minWidth: '280px',
                                        backgroundColor: 'var(--bg-surface)',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                        transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                        border: '1px solid rgba(255,255,255,0.03)'
                                    }}
                                        className="movie-card"
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <div style={{
                                            height: '420px',
                                            backgroundColor: '#1a1a1a',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}>
                                            {movie.poster ? (
                                                <img
                                                    src={movie.poster}
                                                    alt={movie.title}
                                                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            ) : null}
                                            <div style={{
                                                display: movie.poster ? 'none' : 'flex',
                                                width: '100%',
                                                height: '100%',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '5rem',
                                                color: 'var(--text-dim)',
                                                fontWeight: 'bold',
                                                background: 'linear-gradient(45deg, #1e150d, #2d2013)'
                                            }}>
                                                {movie.title[0]}
                                            </div>

                                            <div style={{
                                                position: 'absolute',
                                                top: '1rem',
                                                right: '1rem',
                                                padding: '0.4rem 0.8rem',
                                                backgroundColor: movie.type === 'Series' ? '#e91e63' : '#3f51b5',
                                                color: 'white',
                                                borderRadius: '4px',
                                                fontSize: '0.7rem',
                                                fontWeight: 'bold',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
                                            }}>
                                                {movie.type}
                                            </div>
                                        </div>
                                        <div style={{ padding: '1.5rem' }}>
                                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', height: '1.5em', overflow: 'hidden' }}>{movie.title}</h3>
                                            <p style={{
                                                fontSize: '0.85rem',
                                                color: 'var(--text-dim)',
                                                marginBottom: '1.5rem',
                                                height: '3em',
                                                overflow: 'hidden',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical'
                                            }}>
                                                {movie.description}
                                            </p>
                                            <Link
                                                to={`/movies/${movie.id}`}
                                                style={{
                                                    display: 'block',
                                                    textAlign: 'center',
                                                    padding: '0.75rem',
                                                    backgroundColor: 'transparent',
                                                    border: '1px solid var(--primary)',
                                                    color: 'var(--accent)',
                                                    borderRadius: '8px',
                                                    textDecoration: 'none',
                                                    fontWeight: 'bold',
                                                    transition: 'all 0.3s'
                                                }}
                                                onMouseEnter={(e) => { e.target.style.backgroundColor = 'var(--primary)'; e.target.style.color = 'white'; }}
                                                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--accent)'; }}
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default Home;
