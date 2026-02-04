import { useEffect, useState } from 'react';
import { getMovies } from '../api/movies';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Film, Star, PlayCircle } from 'lucide-react';

const genres = ['Action', 'Horror', 'Comedy', 'Sci-Fi', 'Drama'];

const Home = () => {
    const [categories, setCategories] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    useEffect(() => {
        const fetchAllMovies = async () => {
            try {
                const categoryData = {};
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

    const filterMovies = (movies) => {
        if (!searchQuery) return movies;
        return movies.filter(movie =>
            movie.title.toLowerCase().includes(searchQuery) ||
            movie.description.toLowerCase().includes(searchQuery)
        );
    };

    if (loading) return (
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="spinner">Discovering cinematic gems...</div>
        </div>
    );

    const isSearchActive = searchQuery.length > 0;

    return (
        <div style={{ padding: '0 0 5rem 0', width: '100%' }}>
            {/* Hero Section */}
            <div style={{
                padding: '8rem 2rem 6rem',
                textAlign: 'center',
                background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-deep) 100%)',
                marginBottom: '2rem',
                borderBottom: '1px solid rgba(139, 90, 43, 0.1)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative background element */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '120%',
                    height: '120%',
                    background: 'radial-gradient(circle, rgba(139, 90, 43, 0.05) 0%, transparent 70%)',
                    zIndex: 0
                }}></div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h1 style={{
                        fontSize: 'clamp(3rem, 8vw, 5.5rem)',
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(to right, #fff 20%, var(--accent) 80%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: '900',
                        letterSpacing: '-0.04em',
                        lineHeight: '1.1'
                    }}>
                        {isSearchActive ? `Search Results for "${searchQuery}"` : "The Art of Cinema"}
                    </h1>
                    <p style={{
                        color: 'var(--text-dim)',
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        maxWidth: '850px',
                        margin: '0 auto',
                        opacity: 0.9,
                        lineHeight: '1.6'
                    }}>
                        Movie Review is a premier destination for discovering curated cinematic masterpieces.
                        We bring together community-driven reviews, deep industry insights, and
                        a passion for storytelling that transcends the screen. Join us in celebrating
                        the magic of the moving image.
                    </p>
                </div>
            </div>

            <div style={{ padding: '0 2rem' }}>
                {genres.map(genre => {
                    const filteredMovies = filterMovies(categories[genre] || []);
                    if (filteredMovies.length === 0 && searchQuery) return null;
                    if (!categories[genre] || categories[genre].length === 0) return null;

                    return (
                        <div key={genre} style={{ marginBottom: '6rem' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.5rem',
                                marginBottom: '2.5rem',
                                borderBottom: '1px solid rgba(139, 90, 43, 0.15)',
                                paddingBottom: '1rem'
                            }}>
                                <h2 style={{
                                    color: 'var(--accent)',
                                    fontSize: '2rem',
                                    fontWeight: '800',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    margin: 0
                                }}>
                                    {genre}
                                </h2>
                                <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem', opacity: 0.6 }}>
                                    {filteredMovies.length} {filteredMovies.length === 1 ? 'Title' : 'Titles'}
                                </span>
                            </div>

                            <div style={{
                                display: 'flex',
                                overflowX: 'auto',
                                gap: '2.5rem',
                                paddingBottom: '2.5rem',
                                width: '100%',
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'var(--primary) transparent'
                            }} className="custom-scrollbar">
                                {filteredMovies.map(movie => (
                                    <div key={movie.id} style={{
                                        minWidth: '320px',
                                        maxWidth: '320px',
                                        backgroundColor: 'rgba(30, 21, 13, 0.4)',
                                        borderRadius: '24px',
                                        overflow: 'hidden',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        border: '1px solid rgba(139, 90, 43, 0.1)',
                                        position: 'relative',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                        className="movie-card-v2"
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-12px)';
                                            e.currentTarget.style.borderColor = 'rgba(139, 90, 43, 0.4)';
                                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.6)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.borderColor = 'rgba(139, 90, 43, 0.1)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        <div style={{
                                            aspectRatio: '2/3',
                                            backgroundColor: '#1a1109',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}>
                                            <img
                                                src={movie.poster}
                                                alt={movie.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                                className="poster-img"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                            <div style={{
                                                display: 'none',
                                                width: '100%',
                                                height: '100%',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '4rem',
                                                color: 'var(--text-dim)',
                                                fontWeight: '900',
                                                background: 'var(--bg-surface)'
                                            }}>
                                                {movie.title[0]}
                                            </div>

                                            <div style={{
                                                position: 'absolute',
                                                top: '1.25rem',
                                                left: '1.25rem',
                                                padding: '6px 14px',
                                                backgroundColor: 'rgba(139, 90, 43, 0.9)',
                                                backdropFilter: 'blur(8px)',
                                                color: 'white',
                                                borderRadius: '100px',
                                                fontSize: '0.7rem',
                                                fontWeight: '700',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                                zIndex: 10
                                            }}>
                                                {movie.type.toUpperCase()}
                                            </div>
                                        </div>

                                        <div style={{ padding: '2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                                <h3 style={{ fontSize: '1.35rem', fontWeight: '800', lineHeight: '1.3' }}>{movie.title}</h3>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent)' }}>
                                                    <Star size={16} fill="var(--accent)" />
                                                    <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>4.8</span>
                                                </div>
                                            </div>

                                            <p style={{
                                                fontSize: '0.95rem',
                                                color: 'var(--text-dim)',
                                                marginBottom: '2rem',
                                                lineHeight: '1.6',
                                                flexGrow: 1,
                                                opacity: 0.8
                                            }}>
                                                {movie.description.length > 100 ? movie.description.substring(0, 100) + '...' : movie.description}
                                            </p>

                                            <Link
                                                to={`/movies/${movie.id}`}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '0.6rem',
                                                    padding: '1rem',
                                                    backgroundColor: 'transparent',
                                                    border: '1.5px solid var(--primary)',
                                                    color: 'var(--text-main)',
                                                    borderRadius: '16px',
                                                    textDecoration: 'none',
                                                    fontWeight: '700',
                                                    fontSize: '0.95rem',
                                                    transition: 'all 0.3s'
                                                }}
                                                onMouseEnter={(e) => { e.target.style.backgroundColor = 'var(--primary)'; e.target.style.borderColor = 'var(--primary)'; }}
                                                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.borderColor = 'var(--primary)'; }}
                                            >
                                                <PlayCircle size={18} /> Experience Story
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}

                {searchQuery && Object.values(categories).every(movies => filterMovies(movies).length === 0) && (
                    <div style={{ textAlign: 'center', padding: '10rem 0' }}>
                        <Film size={80} style={{ opacity: 0.1, marginBottom: '2rem' }} />
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-dim)' }}>No films found matching your search.</h2>
                        <p style={{ marginTop: '1rem' }}>Try adjusting your keywords or browse our standard categories.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
