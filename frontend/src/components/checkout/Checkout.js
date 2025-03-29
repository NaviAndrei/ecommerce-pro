import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCart } from '../../store/slices/cartSlice';
import { createOrder, clearOrderSuccess } from '../../store/slices/ordersSlice';
import CheckoutForm from './CheckoutForm';

const CheckoutContainer = styled.div`
  padding: 2rem 0;
`;

const CheckoutTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const CheckoutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (min-width: 992px) {
    flex-direction: row;
  }
`;

const CheckoutFormContainer = styled.div`
  flex: 2;
`;

const OrderSummary = styled.div`
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 100px;
`;

const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SummaryItemName = styled.div`
  flex: 3;
`;

const SummaryItemQuantity = styled.div`
  flex: 1;
  text-align: center;
`;

const SummaryItemPrice = styled.div`
  flex: 1;
  text-align: right;
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #e0e0e0;
  font-weight: bold;
  font-size: 1.2rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.5rem;
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #6c757d;
`;

const OrderSuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &.primary {
    background-color: #28a745;
    color: white;
    border: none;
    
    &:hover {
      background-color: #218838;
    }
  }
  
  &.secondary {
    background-color: #6c757d;
    color: white;
    border: none;
    
    &:hover {
      background-color: #5a6268;
    }
  }
`;

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total, loading: cartLoading } = useSelector(state => state.cart);
  const { loading: orderLoading, success, order, error } = useSelector(state => state.orders);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    address: '',
    phone_number: ''
  });
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    
    dispatch(fetchCart());
    
    // Pre-fill form with user data if available
    if (user) {
      setFormData({
        full_name: `${user.user.first_name} ${user.user.last_name}`.trim(),
        email: user.user.email || '',
        address: user.address || '',
        phone_number: user.phone_number || ''
      });
    }
    
    // Clean up order success state when leaving the page
    return () => {
      dispatch(clearOrderSuccess());
    };
  }, [dispatch, navigate, isAuthenticated, user]);
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createOrder(formData));
  };
  
  const handleViewOrders = () => {
    navigate('/orders');
  };
  
  const handleContinueShopping = () => {
    dispatch(clearOrderSuccess());
    navigate('/products');
  };
  
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }
  
  if (cartLoading) {
    return <LoadingSpinner>Loading checkout information...</LoadingSpinner>;
  }
  
  if (items.length === 0 && !success) {
    return (
      <CheckoutContainer>
        <CheckoutTitle>Checkout</CheckoutTitle>
        <EmptyCartMessage>
          <p>Your cart is empty. Please add items to your cart before checking out.</p>
          <Button className="secondary" onClick={() => navigate('/products')}>
            Browse Products
          </Button>
        </EmptyCartMessage>
      </CheckoutContainer>
    );
  }
  
  if (success && order) {
    return (
      <CheckoutContainer>
        <OrderSuccessMessage>
          <h2>Thank you for your order!</h2>
          <p>Your order has been successfully placed.</p>
          <p>Order ID: #{order.id}</p>
          <p>Total: ${order.total_amount.toFixed(2)}</p>
          <ButtonsContainer>
            <Button className="primary" onClick={handleViewOrders}>
              View My Orders
            </Button>
            <Button className="secondary" onClick={handleContinueShopping}>
              Continue Shopping
            </Button>
          </ButtonsContainer>
        </OrderSuccessMessage>
      </CheckoutContainer>
    );
  }
  
  return (
    <CheckoutContainer>
      <CheckoutTitle>Checkout</CheckoutTitle>
      
      <CheckoutContent>
        <CheckoutFormContainer>
          <CheckoutForm 
            formData={formData}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
            isLoading={orderLoading}
            error={error}
          />
        </CheckoutFormContainer>
        
        <OrderSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          
          {items.map(item => (
            <SummaryItem key={item.id}>
              <SummaryItemName>{item.product.name}</SummaryItemName>
              <SummaryItemQuantity>x{item.quantity}</SummaryItemQuantity>
              <SummaryItemPrice>
                ${(item.product.price * item.quantity).toFixed(2)}
              </SummaryItemPrice>
            </SummaryItem>
          ))}
          
          <SummaryTotal>
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </SummaryTotal>
        </OrderSummary>
      </CheckoutContent>
    </CheckoutContainer>
  );
};

export default Checkout;
