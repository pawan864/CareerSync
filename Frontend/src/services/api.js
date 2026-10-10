import axios from 'axios';

/**
 * Axios instance configured for the CareerSync API.
 * Uses the VITE_API_URL environment variable for the base URL,
 * falling back to a local development URL if not provided.
 * @constant {import('axios').AxiosInstance}
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    withCredentials: true,
});

/**
 * Request interceptor to automatically attach the JWT token to outgoing requests.
 * The token is retrieved from localStorage.
 */
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
