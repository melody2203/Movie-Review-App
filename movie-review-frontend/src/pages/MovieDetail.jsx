import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovie } from '../api/movies';
import { getReviews, createReview, deleteReview, likeReview } from '../api/reviews';
import { AuthContext } from '../context/AuthContext';
import { Star, Clock, Calendar, User as UserIcon, Film, MessageSquare, ThumbsUp, Trash2, ArrowLeft, PlayCircle } from 'lucide-react';

const MovieDetail = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newReview, setNewReview] = useState({ rating: 5, content: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movieData = await getMovie(id);
                setMovie(movieData);
                const reviewsData = await getReviews(id);
                setReviews(reviewsData.results || reviewsData);
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        window.scrollTo(0, 0);
    }, [id]);

    const handleCreateReview = async (e) => {
        e.preventDefault();
        if (!user) return alert("Please login to review");
        setSubmitting(true);
        try {
            const addedReview = await createReview(id, newReview);
            setReviews([addedReview, ...reviews]);
            setNewReview({ rating: 5, content: '' });
        } catch (error) {
            console.error("Failed to add review", error);
            alert("Failed to add review");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (!window.confirm("Delete this review permanence?")) return;
        try {
            await deleteReview(reviewId);
            setReviews(reviews.filter(r => r.id !== reviewId));
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    const handleLikeReview = async (reviewId) => {
        if (!user) return alert("Please login to like reviews");
        try {
            const response = await likeReview(reviewId);
            setReviews(reviews.map(r => {
                if (r.id === reviewId) {
                    return { ...r, likes_count: response.likes_count, is_liked: response.is_liked };
                }
                return r;
            }));
        } catch (error) {
            console.error("Like failed", error);
        }
    };

    if (loading) return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
            <div className="spinner">Loading Cinematic Experience...</div>
        </div>
    );

    if (!movie) return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div>
                <Film size={64} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                <h2>Movie Not Found</h2>
                <Link to="/" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Go back Home</Link>
            </div>
        </div>
    );

    const backdropStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${movie.poster})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(60px) brightness(0.2)',
        zIndex: -1,
        opacity: 0.6
    };

    return (
        <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
            <div style={backdropStyle}></div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                <Link to="/" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--text-dim)',
                    textDecoration: 'none',
                    marginBottom: '2rem',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s ease'
                }} onMouseEnter={e => e.target.style.color = 'var(--text-main)'} onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}>
                    <ArrowLeft size={16} /> Back to Gallery
                </Link>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '3rem',
                    marginBottom: '4rem'
                }}>
                    {/* Poster Section */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            borderRadius: '24px',
                            overflow: 'hidden',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 0 20px rgba(139, 90, 43, 0.2)',
                            maxWidth: '400px',
                            margin: '0 auto',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            aspectRatio: '2/3',
                            position: 'relative'
                        }}>
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#1a1109; color:var(--text-dim); font-size:4rem; font-weight:900">${movie.title[0]}</div>`;
                                }}
                            />
                        </div>
                    </div>

                    {/* Info Section */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                            <span style={{
                                padding: '6px 14px',
                                backgroundColor: 'var(--primary)',
                                color: 'white',
                                borderRadius: '100px',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                letterSpacing: '0.05em'
                            }}>{movie.type.toUpperCase()}</span>
                            <span style={{ color: 'var(--accent)', fontWeight: '600', fontSize: '0.9rem' }}>{movie.genre}</span>
                        </div>

                        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1.5rem', lineHeight: '1.1', color: 'var(--text-main)' }}>{movie.title}</h1>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '2.5rem', color: 'var(--text-dim)', fontSize: '0.95rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={18} /> {movie.release_date}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={18} /> {movie.duration} min</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}><Star size={18} fill="var(--accent)" /> {movie.average_rating || 'N/A'} Rating</div>
                        </div>

                        <div style={{
                            padding: '2rem',
                            backgroundColor: 'rgba(30, 21, 13, 0.6)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '20px',
                            border: '1px solid rgba(139, 90, 43, 0.2)',
                            marginBottom: '2.5rem'
                        }}>
                            <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)', fontSize: '1.2rem' }}>Synopsis</h3>
                            <p style={{ lineHeight: '1.8', color: 'var(--text-dim)', fontSize: '1.05rem' }}>{movie.description}</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div>
                                <h4 style={{ color: 'var(--text-dim)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Director</h4>
                                <p style={{ fontWeight: '600' }}>{movie.director}</p>
                            </div>
                            <div>
                                <h4 style={{ color: 'var(--text-dim)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Cast</h4>
                                <p style={{ fontWeight: '600' }}>{movie.cast}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '3rem',
                        borderBottom: '1px solid rgba(139, 90, 43, 0.2)',
                        paddingBottom: '1rem'
                    }}>
                        <h2 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <MessageSquare className="text-accent" /> Community Reviews
                        </h2>
                        <span style={{ color: 'var(--text-dim)' }}>{reviews.length} Thoughts</span>
                    </div>

                    {user ? (
                        <div style={{
                            backgroundColor: 'var(--bg-surface)',
                            padding: '2.5rem',
                            borderRadius: '24px',
                            marginBottom: '4rem',
                            border: '1px solid rgba(139, 90, 43, 0.1)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                        }}>
                            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>Write an Honest Review</h3>
                            <form onSubmit={handleCreateReview}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Your Rating:</span>
                                    {[1, 2, 3, 4, 5].map(num => (
                                        <Star
                                            key={num}
                                            size={24}
                                            style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                                            fill={newReview.rating >= num ? 'var(--accent)' : 'none'}
                                            color={newReview.rating >= num ? 'var(--accent)' : 'var(--text-dim)'}
                                            onClick={() => setNewReview({ ...newReview, rating: num })}
                                            onMouseEnter={e => e.target.style.transform = 'scale(1.2)'}
                                            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                                        />
                                    ))}
                                </div>
                                <textarea
                                    placeholder="What did you think of the story, acting, and visuals?"
                                    value={newReview.content}
                                    onChange={e => setNewReview({ ...newReview, content: e.target.value })}
                                    style={{
                                        width: '100%',
                                        minHeight: '120px',
                                        padding: '1.2rem',
                                        backgroundColor: 'rgba(0,0,0,0.2)',
                                        border: '1px solid rgba(139, 90, 43, 0.3)',
                                        borderRadius: '16px',
                                        color: 'var(--text-main)',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        marginBottom: '1.5rem',
                                        resize: 'vertical'
                                    }}
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    style={{
                                        padding: '1rem 2.5rem',
                                        backgroundColor: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        fontWeight: '700',
                                        cursor: submitting ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 10px 20px rgba(139, 90, 43, 0.2)'
                                    }}
                                    onMouseEnter={e => { if (!submitting) e.target.style.backgroundColor = 'var(--accent)'; e.target.style.transform = 'translateY(-2px)' }}
                                    onMouseLeave={e => { if (!submitting) e.target.style.backgroundColor = 'var(--primary)'; e.target.style.transform = 'translateY(0)' }}
                                >
                                    {submitting ? 'Sharing...' : 'Post My Review'}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--bg-surface)', borderRadius: '24px', marginBottom: '4rem', opacity: 0.8 }}>
                            <PlayCircle size={48} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
                            <p style={{ color: 'var(--text-dim)' }}>Join the community to share your cinematic insights.</p>
                            <Link to="/login" style={{ color: 'var(--accent)', fontWeight: '600', textDecoration: 'none', display: 'block', marginTop: '1rem' }}>Login or Sign Up</Link>
                        </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {reviews.map(review => (
                            <div key={review.id} style={{
                                backgroundColor: 'rgba(30, 21, 13, 0.4)',
                                backdropFilter: 'blur(10px)',
                                padding: '2rem',
                                borderRadius: '20px',
                                border: '1px solid rgba(139, 90, 43, 0.1)',
                                position: 'relative'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                        <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontWeight: 'bold' }}>
                                            {review.user?.username?.[0]?.toUpperCase() || '?'}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{review.user?.username || 'Anonymous'}</div>
                                            <div style={{ display: 'flex', gap: '2px' }}>
                                                {[1, 2, 3, 4, 5].map(num => (
                                                    <Star key={num} size={12} fill={review.rating >= num ? 'var(--accent)' : 'none'} color={review.rating >= num ? 'var(--accent)' : '#444'} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>{new Date(review.created_at).toLocaleDateString()}</span>
                                </div>
                                <p style={{ lineHeight: '1.7', color: 'var(--text-main)', opacity: 0.9 }}>{review.content}</p>

                                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', borderTop: '1px solid rgba(139, 90, 43, 0.05)', paddingTop: '1rem' }}>
                                    <button
                                        onClick={() => handleLikeReview(review.id)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: review.is_liked ? 'var(--accent)' : 'var(--text-dim)',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.4rem',
                                            fontSize: '0.9rem',
                                            fontWeight: '600',
                                            transition: 'transform 0.2s'
                                        }}
                                        onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                                        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                                    >
                                        <ThumbsUp size={16} fill={review.is_liked ? 'currentColor' : 'none'} /> {review.likes_count || 0} Helpful
                                    </button>

                                    {user && user.id === review.user?.id && (
                                        <button
                                            onClick={() => handleDeleteReview(review.id)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#ff6b6b',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.4rem',
                                                fontSize: '0.8rem',
                                                marginLeft: 'auto'
                                            }}
                                        >
                                            <Trash2 size={14} /> Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {reviews.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-dim)' }}>
                                <MessageSquare size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                                <p>Be the first to start the conversation.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
