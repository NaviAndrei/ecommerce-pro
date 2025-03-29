import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchUserProfile, updateProfile } from '../../store/slices/authSlice';
import { fetchOrders } from '../../store/slices/ordersSlice';
import FormInput from '../common/FormInput';
import Button from '../common/Button';
import Alert from '../common/Alert';
import Spinner from '../common/Spinner';
import OrderHistory from './OrderHistory';

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 992px) {
    grid-template-columns: 1fr 2fr;
  }
`;

const ProfileCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
`;

const ProfileHeading = styled.h2`
  color: var(--primary-color);
  margin-bottom: 1.5rem;
`;

const ProfileSection = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ProfileForm = styled.form``;

const OrdersContainer = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
`;

const Profile = () => {
  const [formData, setFormData] = useState({
    phone_number: '',
    address: ''
  });
  
  const [alerts, setAlerts] = useState({
    success: false,
    error: false
  });
  
  const { user, profile, loading, error } = useSelector(state => state.auth);
  const { items: orders, loading: ordersLoading } = useSelector(state => state.orders);
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Fetch user profile and orders when component mounts
    dispatch(fetchUserProfile());
    dispatch(fetchOrders());
  }, [dispatch]);
  
  // Update form data when profile is loaded
  useEffect(() => {
    if (profile) {
      setFormData({
        phone_number: profile.phone_number || '',
        address: profile.address || ''
      });
    }
  }, [profile]);
  
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    
    dispatch(updateProfile(formData))
      .unwrap()
      .then(() => {
        setAlerts({ success: true, error: false });
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setAlerts(prev => ({ ...prev, success: false }));
        }, 5000);
      })
      .catch(() => {
        setAlerts({ success: false, error: true });
      });
  };
  
  if (loading && !profile) {
    return <Spinner text="Loading profile..." />;
  }
  
  return (
    <ProfileContainer>
      <div>
        <ProfileCard>
          <ProfileHeading>My Account</ProfileHeading>
          
          {alerts.success && (
            <Alert 
              variant="success" 
              title="Profile Updated"
              onDismiss={() => setAlerts(prev => ({ ...prev, success: false }))}
            >
              Your profile information has been updated successfully.
            </Alert>
          )}
          
          {(alerts.error || error) && (
            <Alert 
              variant="error" 
              title="Update Failed"
              onDismiss={() => setAlerts(prev => ({ ...prev, error: false }))}
            >
              {typeof error === 'object' 
                ? Object.values(error).flat().join(' ') 
                : error || 'Failed to update profile. Please try again.'}
            </Alert>
          )}
          
          <ProfileSection>
            <h3>Account Information</h3>
            <p><strong>Username:</strong> {user?.username}</p>
            <p><strong>Name:</strong> {user?.first_name} {user?.last_name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
          </ProfileSection>
          
          <ProfileSection>
            <h3>Contact Information</h3>
            <ProfileForm onSubmit={handleSubmit}>
              <FormInput
                id="phone_number"
                name="phone_number"
                label="Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
                disabled={loading}
              />
              
              <FormInput
                id="address"
                name="address"
                type="textarea"
                label="Address"
                value={formData.address}
                onChange={handleChange}
                disabled={loading}
              />
              
              <Button 
                type="submit" 
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </ProfileForm>
          </ProfileSection>
        </ProfileCard>
      </div>
      
      <div>
        <OrdersContainer>
          <ProfileHeading>Order History</ProfileHeading>
          <OrderHistory orders={orders} loading={ordersLoading} />
        </OrdersContainer>
      </div>
    </ProfileContainer>
  );
};

export default Profile;