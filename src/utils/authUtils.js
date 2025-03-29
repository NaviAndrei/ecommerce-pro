import { jwtDecode } from 'jwt-decode';

/**
 * Set JWT token in localStorage
 * @param {string} token - JWT token string
 */
export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

/**
 * Remove JWT token from localStorage
 */
export const removeAuthToken = () => {
  localStorage.removeItem('token');
};

/**
 * Get JWT token from localStorage
 * @returns {string|null} - JWT token or null if not found
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} - True if token is expired, false otherwise
 */
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const decoded = jwtDecode(token);
    // Check if expiration time is past current time
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (err) {
    return true;
  }
};

/**
 * Extract user data from JWT token
 * @param {string} token - JWT token
 * @returns {object|null} - User data or null if token is invalid
 */
export const getUserFromToken = (token) => {
  if (!token) return null;
  
  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.user_id,
      username: decoded.username,
      email: decoded.email,
      first_name: decoded.first_name,
      last_name: decoded.last_name
    };
  } catch (err) {
    return null;
  }
};