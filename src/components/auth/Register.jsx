import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { register, clearError } from '../../store/slices/authSlice';
import FormInput from '../common/FormInput';
import Button from '../common/Button';
import Alert from '../common/Alert';

const RegisterContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
`;

const RegisterHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const RegisterTitle = styled.h2`
  margin-bottom: 0.5rem;
`;

const RegisterSubtitle = styled.p`
  color: var(--dark-gray);
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  
  a {
    font-weight: 600;
    margin-left: 0.25rem;
  }
`;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: ''
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
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.password2) {
      errors.password2 = 'Please confirm your password';
    } else if (formData.password !== formData.password2) {
      errors.password2 = 'Passwords do not match';
    }
    
    if (!formData.first_name.trim()) {
      errors.first_name = 'First name is required';
    }
    
    if (!formData.last_name.trim()) {
      errors.last_name = 'Last name is required';
    }
    
    setValidationErrors(errors);
    
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await dispatch(register(formData)).unwrap();
        // If successful, the user will be automatically logged in and redirected
      } catch (err) {
        // Error will be handled in the component via the auth state
      }
    }
  };
  
  return (
    <RegisterContainer>
      <RegisterHeader>
        <RegisterTitle>Create an Account</RegisterTitle>
        <RegisterSubtitle>Sign up to start shopping</RegisterSubtitle>
      </RegisterHeader>
      
      {error && (
        <Alert 
          type="error"
          message={
            typeof error === 'object'
              ? Object.entries(error)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(', ')
              : 'Registration failed. Please try again.'
          }
        />
      )}
      
      <RegisterForm onSubmit={handleSubmit}>
        <FieldRow>
          <FormInput
            id="first_name"
            name="first_name"
            label="First Name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Enter your first name"
            error={validationErrors.first_name}
            disabled={loading}
          />
          
          <FormInput
            id="last_name"
            name="last_name"
            label="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Enter your last name"
            error={validationErrors.last_name}
            disabled={loading}
          />
        </FieldRow>
        
        <FormInput
          id="username"
          name="username"
          label="Username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Choose a username"
          error={validationErrors.username}
          disabled={loading}
        />
        
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          error={validationErrors.email}
          disabled={loading}
        />
        
        <FieldRow>
          <FormInput
            id="password"
            name="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Choose a password"
            error={validationErrors.password}
            disabled={loading}
          />
          
          <FormInput
            id="password2"
            name="password2"
            type="password"
            label="Confirm Password"
            value={formData.password2}
            onChange={handleChange}
            placeholder="Confirm your password"
            error={validationErrors.password2}
            disabled={loading}
          />
        </FieldRow>
        
        <Button 
          type="submit" 
          variant="primary" 
          fullWidth 
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </RegisterForm>
      
      <LoginLink>
        Already have an account?
        <Link to="/login">Sign In</Link>
      </LoginLink>
    </RegisterContainer>
  );
};

export default Register;