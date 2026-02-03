import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovies } from '../api/movies';
import { ArrowLeft, Star, PlayCircle } from 'lucide-react';

const GenrePage = () => {
    const { genre } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getMovies({ genre });
                setMovies(data.results || data);
            } catch (error) {
                console.error("Error fetching genre movies", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, [genre]);

    if (loading) return <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

    return (
        <div style={{ padding: '8rem 5% 6rem', minHeight: '90vh' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', marginBottom: '3rem', fontWeight: '600' }}>
                <ArrowLeft size={20} /> Back to Home
            </Link>

            <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '4rem', textTransform: 'capitalize' }}>
                {genre} <span style={{ color: 'var(--accent)' }}>Collection</span>
            </h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2.5rem'
            }}>
                {movies.map(movie => (
                    <div key={movie.id} style={{
                        backgroundColor: 'var(--bg-surface)',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        border: '1px solid rgba(139, 90, 43, 0.1)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{ aspectRatio: '2/3', position: 'relative' }}>
                            <img src={movie.poster} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.4rem 0.8rem', backgroundColor: 'var(--primary)', color: 'white', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '700' }}>
                                {movie.type}
                            </div>
                        </div>
                        <div style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{movie.title}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent)' }}>
                                    <Star size={16} fill="var(--accent)" />
                                    <span style={{ fontWeight: '700' }}>4.8</span>
                                </div>
                            </div>
                            <Link to={`/movies/${movie.id}`} style={{
                                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', padding: '1rem', border: '1.5px solid var(--primary)', borderRadius: '14px', color: 'var(--text-main)', fontWeight: '700', transition: 'all 0.3s'
                            }}>
                                <PlayCircle size={18} /> View Review
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GenrePage;
