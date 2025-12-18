import api from './api';

export const getReviews = async (movieId) => {
    // Uses the endpoint: /api/movies/<id>/reviews/
    const response = await api.get(`movies/${movieId}/reviews/`);
    return response.data;
};

export const createReview = async (movieId, reviewData) => {
    const response = await api.post(`movies/${movieId}/reviews/`, reviewData);
    return response.data;
};

export const deleteReview = async (reviewId) => {
    // Correct path: /api/reviews/reviews/<id>/
    // api base is /api/, so we send reviews/reviews/<id>/
    const response = await api.delete(`reviews/reviews/${reviewId}/`);
    return response.data;
};

export const likeReview = async (reviewId) => {
    // Correct path: /api/reviews/reviews/<id>/like/
    const response = await api.post(`reviews/reviews/${reviewId}/like/`);
    return response.data;
};
