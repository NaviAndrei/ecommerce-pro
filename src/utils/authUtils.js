import jwtDecode from 'jwt-decode';

const TOKEN_KEY = 'auth_token';

/**
 * Set JWT token in localStorage
 * @param {string} token - JWT token string
 */
export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Remove JWT token from localStorage
 */
export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Get JWT token from localStorage
 * @returns {string|null} - JWT token or null if not found
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} - True if token is expired, false otherwise
 */
export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
};

/**
 * Extract user data from JWT token
 * @param {string} token - JWT token
 * @returns {object|null} - User data or null if token is invalid
 */
export const getUserFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.user_id,
      username: decoded.username,
      email: decoded.email,
      first_name: decoded.first_name,
      last_name: decoded.last_name
    };
  } catch {
    return null;
  }
};