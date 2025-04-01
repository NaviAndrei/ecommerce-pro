import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { register, clearError } from '../../store/slices/authSlice';

const AuthContainer = styled.div`
  max-width: 550px; /* Slightly wider for more fields */
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
  gap: 1.3rem; /* Slightly reduce gap for more fields */
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem; /* Slightly reduce margin */
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
  text-align: left; /* Align error text left */
  white-space: pre-wrap; /* Preserve line breaks in errors */
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

const RequiredAsterisk = styled.span`
  color: #C53030; /* Red asterisk */
  margin-left: 0.25rem;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: ''
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector(state => state.auth);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    dispatch(clearError());
  }, [isAuthenticated, navigate, dispatch]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };
  
  // Format errors for display
  const formatErrors = (error) => {
    if (typeof error === 'string') return error;
    if (typeof error === 'object' && error !== null) {
      return Object.entries(error).map(([key, value]) => {
        const formattedKey = key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const formattedValue = Array.isArray(value) ? value.join(', ') : String(value);
        return `${formattedKey}: ${formattedValue}`;
      }).join('\n'); // Use newline to separate field errors
    }
    return 'An unknown error occurred';
  };
  
  return (
    <AuthContainer>
      <Title>Create an Account</Title>
      
      {error && (
        <ErrorMessage>
          {formatErrors(error)}
        </ErrorMessage>
      )}
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">
            Username<RequiredAsterisk>*</RequiredAsterisk>
          </Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Choose a username"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="email">
            Email<RequiredAsterisk>*</RequiredAsterisk>
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="first_name">
            First Name<RequiredAsterisk>*</RequiredAsterisk>
          </Label>
          <Input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            placeholder="Enter your first name"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="last_name">
            Last Name<RequiredAsterisk>*</RequiredAsterisk>
          </Label>
          <Input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            placeholder="Enter your last name"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="password">
            Password<RequiredAsterisk>*</RequiredAsterisk>
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
            placeholder="Create a password (min. 8 characters)"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="password2">
            Confirm Password<RequiredAsterisk>*</RequiredAsterisk>
          </Label>
          <Input
            type="password"
            id="password2"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
          />
        </FormGroup>
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Register'}
        </Button>
      </Form>
      
      <RedirectLink>
        Already have an account? <Link to="/login">Login</Link>
      </RedirectLink>
    </AuthContainer>
  );
};

export default Register; 