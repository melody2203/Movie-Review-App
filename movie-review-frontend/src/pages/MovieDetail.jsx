import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getMovie } from '../api/movies';
import { getReviews, createReview, deleteReview, likeReview } from '../api/reviews';
import { AuthContext } from '../context/AuthContext';

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
                setReviews(reviewsData.results || reviewsData); // Handle pagination
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleCreateReview = async (e) => {
        e.preventDefault();
        if (!user) return alert("Please login to review");
        setSubmitting(true);
        try {
            const addedReview = await createReview(id, newReview);
            // Prepend new review
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
        if (!window.confirm("Are you sure?")) return;
        try {
            await deleteReview(reviewId);
            setReviews(reviews.filter(r => r.id !== reviewId));
        } catch (error) {
            console.error("Desc failed", error);
        }
    };

    const handleLikeReview = async (reviewId) => {
        if (!user) return alert("Please login to like");
        try {
            const response = await likeReview(reviewId); // Returns { status, likes_count, is_liked }
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

    if (loading) return <div>Loading...</div>;
    if (!movie) return <div>Movie not found</div>;

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem', display: 'flex', gap: '2rem' }}>
                <div style={{
                    width: '200px',
                    height: '300px',
                    backgroundColor: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                    color: '#555',
                    flexShrink: 0
                }}>
                    {movie.title[0]}
                </div>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{movie.title}</h1>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <span style={{
                            padding: '4px 8px',
                            backgroundColor: movie.type === 'Series' ? '#e91e63' : '#2196f3',
                            borderRadius: '4px',
                            fontSize: '0.8rem'
                        }}>
                            {movie.type}
                        </span>
                        <span style={{ color: '#aaa' }}>{movie.genre}</span>
                        <span style={{ color: '#aaa' }}>{movie.release_date}</span>
                        <span style={{ color: '#aaa' }}>{movie.duration} min</span>
                    </div>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>{movie.description}</p>
                    <p><strong>Director:</strong> {movie.director}</p>
                    <p><strong>Cast:</strong> {movie.cast}</p>
                </div>
            </div>

            <hr style={{ borderColor: '#333', margin: '2rem 0' }} />

            <h2 style={{ marginBottom: '1rem' }}>Reviews</h2>

            {/* Review Form */}
            {user ? (
                <form onSubmit={handleCreateReview} style={{ backgroundColor: '#222', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
                    <h3 style={{ marginTop: 0 }}>Add a Review</h3>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Rating: </label>
                        <select
                            value={newReview.rating}
                            onChange={e => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                            style={{ padding: '0.5rem', backgroundColor: '#333', color: 'white', border: 'none' }}
                        >
                            {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>{num} Stars</option>
                            ))}
                        </select>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <textarea
                            value={newReview.content}
                            onChange={e => setNewReview({ ...newReview, content: e.target.value })}
                            placeholder="Write your review here..."
                            style={{ width: '100%', minHeight: '100px', padding: '0.5rem', backgroundColor: '#333', color: 'white', border: 'none' }}
                            required
                        />
                    </div>
                    <button type="submit" disabled={submitting} style={{ padding: '0.5rem 1rem', backgroundColor: '#4caf50', border: 'none', color: 'white', cursor: 'pointer' }}>
                        {submitting ? 'Posting...' : 'Post Review'}
                    </button>
                </form>
            ) : (
                <p>Please login to leave a review.</p>
            )}

            {/* Reviews List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {reviews.map(review => (
                    <div key={review.id} style={{ backgroundColor: '#222', padding: '1.5rem', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <div>
                                <strong style={{ fontSize: '1.1rem' }}>{review.user?.username || 'Unknown User'}</strong>
                                <span style={{ marginLeft: '1rem', color: '#ffc107' }}>{'★'.repeat(review.rating)}</span>
                            </div>
                            <span style={{ color: '#777', fontSize: '0.9rem' }}>{new Date(review.created_at).toLocaleDateString()}</span>
                        </div>
                        <p style={{ margin: '0.5rem 0', color: '#ddd' }}>{review.content}</p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', alignItems: 'center' }}>
                            <button
                                onClick={() => handleLikeReview(review.id)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: review.is_liked ? '#e91e63' : '#aaa',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {review.is_liked ? '♥' : '♡'} {review.likes_count || 0} Likes
                            </button>

                            {user && user.id === review.user?.id && (
                                <button
                                    onClick={() => handleDeleteReview(review.id)}
                                    style={{ background: 'none', border: 'none', color: '#f44336', cursor: 'pointer' }}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                {reviews.length === 0 && <p style={{ color: '#777' }}>No reviews yet. Be the first!</p>}
            </div>
        </div>
    );
};

export default MovieDetail;
