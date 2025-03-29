import axios from 'axios';
import { getToken } from '../utils/authUtils';

// Create axios instance with baseURL
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token to requests
apiClient.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Authentication API endpoints
export const authAPI = {
  login: (credentials) => apiClient.post('/token/', credentials),
  register: (userData) => apiClient.post('/register/', userData),
  getProfile: () => apiClient.get('/profile/'),
  updateProfile: (profileData) => apiClient.put('/profile/', profileData)
};

// Products API endpoints
export const productsAPI = {
  getProducts: (params) => apiClient.get('/products/', { params }),
  getProduct: (id) => apiClient.get(`/products/${id}/`),
  getCategories: () => apiClient.get('/categories/')
};

// Cart API endpoints
export const cartAPI = {
  getCart: () => apiClient.get('/cart/'),
  addToCart: (productId, quantity) => apiClient.post('/cart/items/', { product_id: productId, quantity }),
  updateCartItem: (itemId, quantity) => apiClient.put(`/cart/items/${itemId}/`, { quantity }),
  removeCartItem: (itemId) => apiClient.delete(`/cart/items/${itemId}/`)
};

// Orders API endpoints
export const ordersAPI = {
  getOrders: () => apiClient.get('/orders/'),
  getOrder: (id) => apiClient.get(`/orders/${id}/`),
  createOrder: (orderData) => apiClient.post('/orders/', orderData)
};

export default apiClient;