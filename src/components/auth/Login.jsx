import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { login, clearError } from '../../store/slices/authSlice';
import FormInput from '../common/FormInput';
import Button from '../common/Button';
import Alert from '../common/Alert';
import Spinner from '../common/Spinner';

const LoginContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LoginTitle = styled.h1`
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const LoginSubtitle = styled.p`
  color: var(--dark-gray);
`;

const LoginForm = styled.form`
  margin-bottom: 1.5rem;
`;

const RegisterText = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: var(--dark-gray);
  
  a {
    color: var(--primary-color);
    font-weight: 500;
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const { username, password } = formData;
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
    
    // Clear any previous errors when component mounts or unmounts
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, navigate, dispatch]);
  
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };
  
  return (
    <LoginContainer>
      <LoginHeader>
        <LoginTitle>Welcome Back</LoginTitle>
        <LoginSubtitle>Sign in to your account</LoginSubtitle>
      </LoginHeader>
      
      {error && (
        <Alert 
          variant="error" 
          title="Login Failed"
          onDismiss={() => dispatch(clearError())}
        >
          {typeof error === 'object' 
            ? Object.values(error).flat().join(' ') 
            : error}
        </Alert>
      )}
      
      <LoginForm onSubmit={handleSubmit}>
        <FormInput
          id="username"
          name="username"
          label="Username"
          value={username}
          onChange={handleChange}
          disabled={loading}
          required
        />
        
        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          value={password}
          onChange={handleChange}
          disabled={loading}
          required
        />
        
        <Button 
          type="submit" 
          fullWidth 
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </LoginForm>
      
      <RegisterText>
        Don't have an account? <Link to="/register">Register</Link>
      </RegisterText>
    </LoginContainer>
  );
};

export default Login;