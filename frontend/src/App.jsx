import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/slices/authSlice';

// Route guard
import PrivateRoute from './routes/index.jsx';

// Layout component
import Layout from './components/layout/Layout.jsx';

// Auth components
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';

// Product components
import ProductList from './components/products/ProductList.jsx';
import ProductDetail from './components/products/ProductDetail.jsx';

// Cart components
import CartPage from './components/cart/CartPage.jsx';
import Checkout from './components/checkout/Checkout.jsx';

// Profile components
import Profile from './components/profile/Profile.jsx';
import OrderHistory from './components/profile/OrderHistory.jsx';

// Pages
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading && !isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          } />
          <Route path="profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="orders" element={
            <PrivateRoute>
              <OrderHistory />
            </PrivateRoute>
          } />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App; 