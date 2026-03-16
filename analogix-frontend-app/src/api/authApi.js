import httpClient from './httpClient';

/**
 * Register a new user
 * @param {Object} payload - Registration data
 * @param {string} payload.username - Username (3-50 chars)
 * @param {string} payload.email - Email address
 * @param {string} payload.password - Password (min 8, must include upper, lower, number, special char)
 * @returns {Promise} Response from backend
 */
export const register = async (payload) => {
  try {
    const response = await httpClient.post('/Authentication/Register', payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Login user with email and password
 * @param {Object} payload - Login credentials
 * @param {string} payload.email - Email address
 * @param {string} payload.password - Password
 * @returns {Promise} Response containing JWT token
 */
export const login = async (payload) => {
  try {
    const response = await httpClient.post('/Authentication/Login', payload);
    const { token } = response.data;
    
    // Store token in localStorage
    if (token) {
      localStorage.setItem('auth_token', token);
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Logout by clearing the token from storage
 */
export const logout = () => {
  localStorage.removeItem('auth_token');
};

/**
 * Get stored token from localStorage
 * @returns {string|null} JWT token or null if not found
 */
export const getToken = () => {
  return localStorage.getItem('auth_token');
};
