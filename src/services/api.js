import axios from 'axios';
import { getToken } from '../utils/authUtils';

// Base API configuration
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication endpoints
export const authAPI = {
  // Login user
  login: (credentials) => api.post('/auth/token/', credentials),
  
  // Register new user
  register: (userData) => api.post('/auth/register/', userData),
  
  // Get user profile
  getProfile: () => api.get('/auth/profile/'),
  
  // Update user profile
  updateProfile: (profileData) => api.put('/auth/profile/', profileData)
};

// Products endpoints
export const productsAPI = {
  // Get all products
  getProducts: (params) => api.get('/products/', { params }),
  
  // Get single product by ID
  getProduct: (id) => api.get(`/products/${id}/`),
  
  // Get product categories
  getCategories: () => api.get('/categories/')
};

// Cart endpoints
export const cartAPI = {
  // Get user cart
  getCart: () => api.get('/cart/'),
  
  // Add item to cart
  addCartItem: (cartData) => api.post('/cart/items/', cartData),
  
  // Update cart item
  updateCartItem: (itemId, quantity) => api.put(`/cart/items/${itemId}/`, { quantity }),
  
  // Remove item from cart
  removeCartItem: (itemId) => api.delete(`/cart/items/${itemId}/`)
};

// Orders endpoints
export const ordersAPI = {
  // Get user orders
  getOrders: () => api.get('/orders/'),
  
  // Get single order
  getOrder: (id) => api.get(`/orders/${id}/`),
  
  // Create a new order
  createOrder: (orderData) => api.post('/orders/', orderData)
};

export default api;