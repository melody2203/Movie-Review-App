import api from './api';

export const getMovies = async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`movies/?${queryString}`);
    return response.data;
};

export const getMovie = async (id) => {
    const response = await api.get(`movies/${id}/`);
    return response.data;
};
