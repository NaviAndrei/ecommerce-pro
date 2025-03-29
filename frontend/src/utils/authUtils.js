import api from '../services/api';

// Set token in axios headers
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Remove token from axios headers
export const removeAuthToken = () => {
  delete api.defaults.headers.common['Authorization'];
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Check if token is expired
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    // Get the payload part of the JWT
    const payload = JSON.parse(atob(token.split('.')[1]));
    // Get current time in seconds
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Check if token is expired
    return payload.exp < currentTime;
  } catch (e) {
    return true;
  }
};

// Get user info from token
export const getUserFromToken = (token) => {
  if (!token) return null;
  
  try {
    // Get the payload part of the JWT
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.user_id,
      username: payload.username
    };
  } catch (e) {
    return null;
  }
};
