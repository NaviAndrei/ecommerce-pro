import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCart } from '../../store/slices/cartSlice';
import CartItem from './CartItem';

const CartContainer = styled.div`
  padding: 2rem 0;
`;

const CartTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const CartContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (min-width: 992px) {
    flex-direction: row;
  }
`;

const CartItemsContainer = styled.div`
  flex: 3;
`;

const CartSummary = styled.div`
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

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: ${props => props.total ? '1.2rem' : '1rem'};
  font-weight: ${props => props.total ? 'bold' : 'normal'};
`;

const CheckoutButton = styled(Link)`
  display: block;
  text-align: center;
  background-color: #28a745;
  color: white;
  text-decoration: none;
  padding: 0.75rem;
  border-radius: 4px;
  margin-top: 1.5rem;
  transition: background-color 0.3s;
  font-weight: bold;
  
  &:hover {
    background-color: #218838;
    color: white;
  }
`;

const ContinueShoppingButton = styled(Link)`
  display: inline-block;
  text-align: center;
  background-color: #6c757d;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #5a6268;
    color: white;
  }
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #6c757d;
  border: 1px dashed #e0e0e0;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.5rem;
`;

const Cart = () => {
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
    return <div>Error: {error}</div>;
  }
  
  // Check if cart is empty
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
              <span>${total.toFixed(2)}</span>
            </SummaryRow>
            
            <SummaryRow>
              <span>Shipping</span>
              <span>Free</span>
            </SummaryRow>
            
            <SummaryRow>
              <span>Taxes</span>
              <span>Calculated at checkout</span>
            </SummaryRow>
            
            <hr />
            
            <SummaryRow total>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
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

export default Cart;
