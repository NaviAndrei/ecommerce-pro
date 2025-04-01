import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCart } from '../../store/slices/cartSlice';
import CartItem from './CartItem';

// Styled Components using the palette
const CartContainer = styled.div`
  padding: 2rem 0;
`;

const CartTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 600;
  color: #2D3748; /* Charcoal */
  margin-bottom: 2rem;
`;

const CartContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  
  @media (min-width: 992px) {
    flex-direction: row;
  }
`;

const CartItemsContainer = styled.div`
  flex: 3;
`;

const CartSummary = styled.div`
  flex: 1;
  background-color: #F7FAFC; /* Very Light Gray/Off-white background */
  border: 1px solid #E2E8F0; /* Lighter Gray border */
  border-radius: 8px;
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 100px; /* Adjust based on Navbar height if needed */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const SummaryTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  color: #2D3748; /* Charcoal */
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #E2E8F0; /* Lighter Gray border */
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  font-size: ${props => props.total ? '1.2rem' : '1rem'};
  color: ${props => props.total ? '#2D3748' : '#4A5568'}; /* Charcoal for total, Medium Gray otherwise */
  font-weight: ${props => props.total ? 'bold' : 'normal'};
`;

const StyledHr = styled.hr`
  border: 0;
  height: 1px;
  background-color: #E2E8F0; /* Lighter Gray */
  margin: 1rem 0 1.5rem 0;
`;

const CheckoutButton = styled(Link)`
  display: block;
  text-align: center;
  background-color: #15803D; /* Accent Emerald Green */
  color: white;
  font-weight: bold;
  text-decoration: none;
  padding: 0.9rem;
  font-size: 1.1rem;
  border-radius: 4px;
  margin-top: 1.5rem;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #D53F8C; /* Darker Pink */
    color: white;
  }
`;

const ContinueShoppingButton = styled(Link)`
  display: inline-block;
  text-align: center;
  background-color: transparent;
  color: #4A5568; /* Medium Gray */
  border: 1px solid #CBD5E0; /* Gray border */
  text-decoration: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  margin-top: 1.5rem;
  margin-right: 1rem; /* Add space if needed next to other buttons */
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  
  &:hover {
    background-color: #E2E8F0; /* Lighter Gray background on hover */
    color: #2D3748; /* Charcoal text on hover */
    border-color: #A0AEC0; /* Medium Gray border on hover */
  }
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  font-size: 1.2rem;
  color: #4A5568; /* Medium Gray */
  background-color: #F7FAFC; /* Very Light Gray/Off-white */
  border: 1px dashed #CBD5E0; /* Dashed Gray border */
  border-radius: 8px;
  margin-bottom: 2rem;

  p {
    margin: 0.5rem 0 1.5rem 0;
  }
`;

// Reuse LoadingSpinner and ErrorMessage styles if defined globally or import them
const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.5rem;
  color: #4A5568;
`;

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total, loading, error } = useSelector(state => state.cart);
  const { isAuthenticated } = useSelector(state => state.auth);
  
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    } else {
      navigate('/login', { state: { from: '/cart' } });
    }
  }, [dispatch, isAuthenticated, navigate]);
  
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }
  
  if (loading) {
    return <LoadingSpinner>Loading cart...</LoadingSpinner>;
  }
  
  if (error) {
    // Consider a styled error component
    return <div>Error: {error}</div>;
  }
  
  const isCartEmpty = items.length === 0;

  return (
    <CartContainer>
      <CartTitle>Your Shopping Cart</CartTitle>
      
      {isCartEmpty ? (
        <EmptyCartMessage>
          <div>Your cart is empty</div>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <ContinueShoppingButton to="/products">
            Continue Shopping
          </ContinueShoppingButton>
        </EmptyCartMessage>
      ) : (
        <CartContent>
          <CartItemsContainer>
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
            
            <ContinueShoppingButton to="/products">
              Continue Shopping
            </ContinueShoppingButton>
          </CartItemsContainer>
          
          <CartSummary>
            <SummaryTitle>Order Summary</SummaryTitle>
            
            <SummaryRow>
              <span>Subtotal</span>
              <span>{total.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
            </SummaryRow>
            
            <SummaryRow>
              <span>Shipping</span>
              <span>Free</span>
            </SummaryRow>
            
            <SummaryRow>
              <span>Taxes</span>
              <span>Calculated at checkout</span>
            </SummaryRow>
            
            <StyledHr /> {/* Use styled HR */}
            
            <SummaryRow total>
              <span>Total</span>
              <span>{total.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
            </SummaryRow>
            
            <CheckoutButton to="/checkout">
              Proceed to Checkout
            </CheckoutButton>
          </CartSummary>
        </CartContent>
      )}
    </CartContainer>
  );
};

export default CartPage; 