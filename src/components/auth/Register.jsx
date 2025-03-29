import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { register, clearError } from '../../store/slices/authSlice';
import FormInput from '../common/FormInput';
import Button from '../common/Button';
import Alert from '../common/Alert';
import Spinner from '../common/Spinner';

const RegisterContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
`;

const RegisterHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const RegisterTitle = styled.h1`
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const RegisterSubtitle = styled.p`
  color: var(--dark-gray);
`;

const RegisterForm = styled.form`
  margin-bottom: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const LoginText = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: var(--dark-gray);
  
  a {
    color: var(--primary-color);
    font-weight: 500;
  }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: ''
  });
  
  const { username, email, password, password2, first_name, last_name } = formData;
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
    dispatch(register(formData));
  };
  
  return (
    <RegisterContainer>
      <RegisterHeader>
        <RegisterTitle>Create Account</RegisterTitle>
        <RegisterSubtitle>Join ShopEase today</RegisterSubtitle>
      </RegisterHeader>
      
      {error && (
        <Alert 
          variant="error" 
          title="Registration Failed"
          onDismiss={() => dispatch(clearError())}
        >
          {typeof error === 'object' 
            ? Object.values(error).flat().join(' ') 
            : error}
        </Alert>
      )}
      
      <RegisterForm onSubmit={handleSubmit}>
        <FormRow>
          <FormInput
            id="first_name"
            name="first_name"
            label="First Name"
            value={first_name}
            onChange={handleChange}
            disabled={loading}
            required
          />
          
          <FormInput
            id="last_name"
            name="last_name"
            label="Last Name"
            value={last_name}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </FormRow>
        
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
          id="email"
          name="email"
          type="email"
          label="Email Address"
          value={email}
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
          helperText="Password must be at least 8 characters long."
        />
        
        <FormInput
          id="password2"
          name="password2"
          type="password"
          label="Confirm Password"
          value={password2}
          onChange={handleChange}
          disabled={loading}
          error={password !== password2 && password2 !== '' ? "Passwords don't match" : null}
          required
        />
        
        <Button 
          type="submit" 
          fullWidth 
          disabled={loading || (password !== password2 && password2 !== '')}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </RegisterForm>
      
      <LoginText>
        Already have an account? <Link to="/login">Login</Link>
      </LoginText>
    </RegisterContainer>
  );
};

export default Register;