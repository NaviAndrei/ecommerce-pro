import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/layout/Layout';
import GlobalStyles from './styles/GlobalStyles';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Profile Components
import Profile from './components/profile/Profile';

// Temporary Home Component
const Home = () => (
  <div>
    <h1>Welcome to ShopEase</h1>
    <p>Your one-stop shop for all your needs.</p>
  </div>
);

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Layout>
                <Profile />
              </Layout>
            </PrivateRoute>
          }
        />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
};

export default App;