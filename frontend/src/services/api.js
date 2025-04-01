import axios from 'axios';

const api = axios.create({
  baseURL: 'https://syncwivan.pythonanywhere.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add token to request if it exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 (Unauthorized) and there's a refresh token
    if (error.response && 
        error.response.status === 401 && 
        !originalRequest._retry) {
      
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (refreshToken) {
        try {
          // Attempt to get a new token
          const response = await axios.post('https://syncwivan.pythonanywhere.com/api/token/refresh/', {
            refresh: refreshToken
          });
          
          // If successful, store the new token
          const newToken = response.data.access;
          localStorage.setItem('token', newToken);
          
          // Update Authorization header and retry the original request
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // If refresh fails, redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
