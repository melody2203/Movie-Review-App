import api from './api';

export const login = async (username, password) => {
    const response = await api.post('reviews/auth/login/', { username, password });
    return response.data;
};

export const register = async (userData) => {
    const response = await api.post('users/register/', userData);
    return response.data;
};
