import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { updateProfile } from '../../store/slices/authSlice';

const ProfileContainer = styled.div`
  padding: 2rem 0;
`;

const ProfileTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const ProfileCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
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
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  
  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  min-height: 100px;
  
  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  max-width: 200px;
  
  &:hover {
    background-color: #0069d9;
  }
  
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  color: #155724;
  background-color: #d4edda;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  background-color: #f8d7da;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const UserInfoSection = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #dee2e6;
`;

const UserInfoTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const UserInfoItem = styled.div`
  margin-bottom: 0.75rem;
  
  span {
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error } = useSelector(state => state.auth);
  
  const [formData, setFormData] = useState({
    address: '',
    phone_number: ''
  });
  
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/profile' } });
      return;
    }
    
    // Initialize form with user data
    if (user) {
      setFormData({
        address: user.address || '',
        phone_number: user.phone_number || ''
      });
    }
  }, [isAuthenticated, navigate, user]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    
    try {
      await dispatch(updateProfile(formData)).unwrap();
      setSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };
  
  if (!isAuthenticated || !user) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <ProfileContainer>
      <ProfileTitle>My Profile</ProfileTitle>
      
      <ProfileCard>
        <UserInfoSection>
          <UserInfoTitle>Account Information</UserInfoTitle>
          <UserInfoItem>
            <span>Username:</span>
            {user.user.username}
          </UserInfoItem>
          <UserInfoItem>
            <span>Name:</span>
            {`${user.user.first_name} ${user.user.last_name}`}
          </UserInfoItem>
          <UserInfoItem>
            <span>Email:</span>
            {user.user.email}
          </UserInfoItem>
        </UserInfoSection>
        
        {success && (
          <SuccessMessage>
            Profile updated successfully!
          </SuccessMessage>
        )}
        
        {error && (
          <ErrorMessage>
            {typeof error === 'object' 
              ? Object.keys(error).map(key => (
                  <div key={key}>{key}: {error[key]}</div>
                ))
              : error}
          </ErrorMessage>
        )}
        
        <Form onSubmit={handleSubmit}>
          <UserInfoTitle>Update Profile</UserInfoTitle>
          
          <FormGroup>
            <Label htmlFor="address">Shipping Address</Label>
            <TextArea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your shipping address"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </FormGroup>
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
        </Form>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile;
