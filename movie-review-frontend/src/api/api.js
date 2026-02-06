import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        console.log("Starting Request", config.method, config.url);
        return config;
    },
    (error) => {
        console.error("Request Error", error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log("Response:", response.status, response.data);
        return response;
    },
    (error) => {
        console.error("API Error Response:", error.response);

        // Handle 401 Unauthorized - Stale/Invalid Token
        if (error.response && error.response.status === 401) {
            console.warn("Unauthorized! Clearing session...");
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // We could redirect to login here, but letting the app handle it via state change is cleaner
            // window.location.href = '/login'; 
        }

        return Promise.reject(error);
    }
);

export default api;
