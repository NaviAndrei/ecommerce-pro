import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchUserProfile, updateProfile } from '../../store/slices/authSlice';
import { fetchOrders } from '../../store/slices/ordersSlice';
import OrderHistory from './OrderHistory';
import Spinner from '../common/Spinner';
import Button from '../common/Button';
import Alert from '../common/Alert';

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileSidebar = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
`;

const ProfileContent = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
`;

const ProfileHeader = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const ProfileTitle = styled.h2`
  margin-bottom: 0;
`;

const ProfileNavigation = styled.div`
  margin-bottom: 1.5rem;
`;

const ProfileNavButton = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border: none;
  border-radius: var(--border-radius);
  background-color: ${props => props.active ? 'var(--primary-light)' : 'var(--light-gray)'};
  color: ${props => props.active ? 'white' : 'var(--text-color)'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--primary-light)' : 'var(--primary-light)'};
    color: white;
  }
`;

const UserInfo = styled.div`
  margin-bottom: 1.5rem;
`;

const UserName = styled.h3`
  margin-bottom: 0.5rem;
`;

const UserEmail = styled.p`
  color: var(--dark-gray);
  margin-bottom: 0;
`;

const ProfileForm = styled.form`
  display: grid;
  gap: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Profile = () => {
  const dispatch = useDispatch();
  const { user, profile, loading, error } = useSelector(state => state.auth);
  const { orders } = useSelector(state => state.orders);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    address: '',
    phone_number: ''
  });
  const [alertMessage, setAlertMessage] = useState(null);
  
  useEffect(() => {
    // Fetch user profile and orders
    dispatch(fetchUserProfile());
    dispatch(fetchOrders());
  }, [dispatch]);
  
  useEffect(() => {
    // Update form data when profile data is available
    if (profile) {
      setFormData({
        address: profile.address || '',
        phone_number: profile.phone_number || ''
      });
    }
  }, [profile]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await dispatch(updateProfile(formData)).unwrap();
      setAlertMessage({
        type: 'success',
        text: 'Profile updated successfully!'
      });
      
      // Clear alert after 3 seconds
      setTimeout(() => {
        setAlertMessage(null);
      }, 3000);
    } catch (err) {
      setAlertMessage({
        type: 'error',
        text: 'Failed to update profile. Please try again.'
      });
    }
  };
  
  const handleCancel = () => {
    // Reset form data to original profile data
    if (profile) {
      setFormData({
        address: profile.address || '',
        phone_number: profile.phone_number || ''
      });
    }
  };
  
  if (loading && !profile) {
    return <Spinner text="Loading profile..." />;
  }
  
  return (
    <ProfileContainer>
      <ProfileSidebar>
        {user && profile && (
          <UserInfo>
            <UserName>{user.first_name} {user.last_name}</UserName>
            <UserEmail>{user.email}</UserEmail>
          </UserInfo>
        )}
        
        <ProfileNavigation>
          <ProfileNavButton 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')}
          >
            Personal Information
          </ProfileNavButton>
          <ProfileNavButton 
            active={activeTab === 'orders'} 
            onClick={() => setActiveTab('orders')}
          >
            Order History
          </ProfileNavButton>
        </ProfileNavigation>
      </ProfileSidebar>
      
      <ProfileContent>
        <ProfileHeader>
          <ProfileTitle>
            {activeTab === 'profile' ? 'Personal Information' : 'Order History'}
          </ProfileTitle>
        </ProfileHeader>
        
        {alertMessage && (
          <Alert type={alertMessage.type} message={alertMessage.text} />
        )}
        
        {activeTab === 'profile' ? (
          <ProfileForm onSubmit={handleSubmit}>
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
                id="phone_number"
                name="phone_number"
                type="tel"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </FormGroup>
            
            <ButtonGroup>
              <Button type="button" variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </ButtonGroup>
          </ProfileForm>
        ) : (
          <OrderHistory orders={orders} loading={loading} />
        )}
      </ProfileContent>
    </ProfileContainer>
  );
};

export default Profile;