import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { login, clearError } from '../../store/slices/authSlice';

// Styled components using the defined palette
const AuthContainer = styled.div`
  max-width: 450px;
  margin: 2rem auto;
  padding: 2.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 600;
  color: #2D3748; /* Charcoal */
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.6rem;
  font-weight: 500;
  color: #4A5568; /* Medium Gray */
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  border: 1px solid #E2E8F0; /* Lighter Gray border */
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    border-color: #9AE6B4; /* Mint Green focus */
    outline: 0;
    box-shadow: 0 0 0 3px rgba(154, 230, 180, 0.3); /* Mint Green focus shadow */
  }
`;

const Button = styled.button`
  background-color: #15803D; /* Accent Emerald Green */
  color: white;
  border: none;
  padding: 0.9rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem; /* Add margin above button */
  
  &:hover {
    background-color: #D53F8C; /* Darker Pink */
  }
  
  &:disabled {
    background-color: #A0AEC0; /* Light Gray for disabled */
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #C53030; /* Red error text */
  background-color: #FED7D7; /* Light Red background */
  padding: 0.8rem 1rem;
  border: 1px solid #FBB6B6; /* Red border */
  border-radius: 4px;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const RedirectLink = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: #4A5568; /* Medium Gray */
  
  a {
    color: #15803D; /* Accent Emerald Green link */
    font-weight: 500;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
      color: #D53F8C; /* Darker Pink */
    }
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading, error } = useSelector(state => state.auth);
  
  const from = location.state?.from || '/';
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
    dispatch(clearError());
  }, [isAuthenticated, navigate, from, dispatch]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <AuthContainer>
      <Title>Login</Title>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Enter your username"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </FormGroup>
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Form>
      
      <RedirectLink>
        Don't have an account? <Link to="/register">Register</Link>
      </RedirectLink>
    </AuthContainer>
  );
};

export default Login; 