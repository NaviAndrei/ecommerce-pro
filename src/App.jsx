import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './store/slices/authSlice';

// Layout
import Layout from './components/layout/Layout';

// Auth components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Profile components
import Profile from './components/profile/Profile';

// Placeholder components for future implementation
const Home = () => <div>Home Page - Coming Soon</div>;
const Products = () => <div>Products Page - Coming Soon</div>;
const ProductDetail = () => <div>Product Detail Page - Coming Soon</div>;
const Cart = () => <div>Cart Page - Coming Soon</div>;
const Checkout = () => <div>Checkout Page - Coming Soon</div>;
const NotFound = () => <div>404 - Page Not Found</div>;

// Private Route component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const dispatch = useDispatch();

  // Check for authenticated user on initial load
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        
        {/* Protected routes */}
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/checkout" element={
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        } />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;