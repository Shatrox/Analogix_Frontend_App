import axios from 'axios';

// Create Axios instance with base URL from environment variable
const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:7249/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Add token from localStorage to every request
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle 401 (unauthorized) responses
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear storage and redirect to login
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default httpClient;
