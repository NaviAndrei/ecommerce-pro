import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login, clearError } from '../../store/slices/authSlice';
import FormInput from '../common/FormInput';
import Button from '../common/Button';
import Alert from '../common/Alert';
import Spinner from '../common/Spinner';

const LoginContainer = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LoginTitle = styled.h2`
  margin-bottom: 0.5rem;
`;

const LoginSubtitle = styled.p`
  color: var(--dark-gray);
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ForgotPassword = styled(Link)`
  font-size: 0.875rem;
  text-align: right;
  margin-top: -0.5rem;
`;

const RegisterLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  
  a {
    font-weight: 600;
    margin-left: 0.25rem;
  }
`;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [validationErrors, setValidationErrors] = useState({});
  
  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/');
    }
    
    // Clear any existing errors when component mounts
    dispatch(clearError());
  }, [isAuthenticated, navigate, dispatch]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    
    setValidationErrors(errors);
    
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await dispatch(login(formData)).unwrap();
        navigate('/');
      } catch (err) {
        // Error will be handled in the component via the auth state
      }
    }
  };
  
  return (
    <LoginContainer>
      <LoginHeader>
        <LoginTitle>Welcome Back</LoginTitle>
        <LoginSubtitle>Sign in to your account</LoginSubtitle>
      </LoginHeader>
      
      {error && (
        <Alert 
          type="error"
          message={
            typeof error === 'object' && error.detail
              ? error.detail
              : 'Login failed. Please check your credentials and try again.'
          }
        />
      )}
      
      <LoginForm onSubmit={handleSubmit}>
        <FormInput
          id="username"
          name="username"
          label="Username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          error={validationErrors.username}
          disabled={loading}
        />
        
        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          error={validationErrors.password}
          disabled={loading}
        />
        
        <ForgotPassword to="/forgot-password">Forgot password?</ForgotPassword>
        
        <Button 
          type="submit" 
          variant="primary" 
          fullWidth 
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </LoginForm>
      
      <RegisterLink>
        Don't have an account?
        <Link to="/register">Register</Link>
      </RegisterLink>
    </LoginContainer>
  );
};

export default Login;