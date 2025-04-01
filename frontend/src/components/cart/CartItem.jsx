import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { updateCartItem, removeFromCart } from '../../store/slices/cartSlice';

// Styled Components using the palette
const CartItemContainer = styled.div`
  display: flex;
  background-color: #ffffff; /* White background for item */
  border: 1px solid #E2E8F0; /* Lighter Gray border */
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const ProductImage = styled.div`
  width: 100px;
  height: 100px;
  flex-shrink: 0; /* Prevent image from shrinking */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa; /* Keep light background for image */
  border-radius: 4px;
  margin-right: 1.5rem;
  
  @media (max-width: 768px) {
    width: 80px; /* Smaller image on mobile */
    height: 80px;
    margin-right: 0;
    margin-bottom: 1rem;
  }
  
  img {
    max-width: 90%; /* Slightly smaller image */
    max-height: 90%;
    object-fit: contain;
  }
  
  /* Style for no image placeholder */
  div {
    color: #A0AEC0; /* Light Gray */
    font-size: 0.9rem;
  }
`;

const ProductInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Distribute space */
`;

const ProductDetails = styled.div`
  margin-bottom: 1rem;
`;

const ProductName = styled(Link)`
  font-size: 1.1rem;
  font-weight: 600; /* Slightly bolder */
  color: #2D3748; /* Charcoal */
  text-decoration: none;
  display: block; /* Ensure it takes block space */
  margin-bottom: 0.3rem;
  
  &:hover {
    color: #15803D; /* Accent Emerald Green on hover */
  }
`;

const ProductPrice = styled.div`
  margin-top: 0.5rem;
  color: #9AE6B4; /* Mint Green price */
  font-weight: bold;
  font-size: 1.1rem;
`;

const ProductCategory = styled.div`
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: #718096; /* Medium Gray */
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto; /* Push actions to the bottom */
  gap: 1rem; /* Add gap between action groups */
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    margin-top: 1rem;
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityLabel = styled.span`
  margin-right: 0.5rem;
  color: #4A5568; /* Medium Gray */
  font-size: 0.9rem;
`;

const QuantityInput = styled.input`
  width: 50px;
  padding: 0.4rem 0.6rem;
  border: 1px solid #CBD5E0; /* Gray border */
  border-radius: 4px;
  text-align: center;
  font-size: 0.9rem;

  &:focus {
    border-color: #9AE6B4; /* Mint Green focus */
    outline: 0;
    box-shadow: 0 0 0 3px rgba(154, 230, 180, 0.3);
  }
`;

// Base Button for Update/Remove
const ActionButton = styled.button`
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, opacity 0.3s;
  margin-left: 0.5rem;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const UpdateButton = styled(ActionButton)`
  background-color: #A0AEC0; /* Light Gray */
  
  &:hover:not(:disabled) {
    background-color: #718096; /* Medium Gray hover */
  }
`;

const RemoveButton = styled(ActionButton)`
  background-color: #FEB2B2; /* Light Red/Pink */
  color: #C53030; /* Dark Red text */

  &:hover:not(:disabled) {
    background-color: #FBB6B6; /* Slightly darker red hover */
  }
`;

const TotalPrice = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  color: #2D3748; /* Charcoal */
  margin-left: auto; /* Push total price to the right */
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 1rem;
    width: 100%;
    text-align: right;
  }
`;

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    // Allow setting to 0 or less temporarily, validation happens on update
    if (!isNaN(value)) {
        setQuantity(Math.max(1, value)); // Ensure quantity is at least 1 in input
    }
  };
  
  const handleUpdateQuantity = async () => {
    const validQuantity = Math.max(1, quantity); // Ensure we update with at least 1
    if (validQuantity !== item.quantity) {
      setIsUpdating(true);
      try {
        await dispatch(updateCartItem({
          itemId: item.id,
          quantity: validQuantity
        })).unwrap();
         setQuantity(validQuantity); // Ensure local state matches if API lags
      } catch (error) {
        console.error('Failed to update quantity:', error);
        // Optionally revert quantity or show error
        setQuantity(item.quantity);
      } finally {
        setIsUpdating(false);
      }
    }
  };
  
  const handleRemoveItem = async () => {
    setIsRemoving(true);
    try {
      await dispatch(removeFromCart(item.id)).unwrap();
      // No need to setIsRemoving(false) if the component unmounts
    } catch (error) {
      console.error('Failed to remove item:', error);
      setIsRemoving(false); // Only set false if removal failed
    }
  };
  
  const totalPrice = item.product.price * quantity; // Use local quantity for display

  return (
    <CartItemContainer>
      <ProductImage>
        {item.product.image_url ? (
          <img src={item.product.image_url} alt={item.product.name} />
        ) : (
          <div>No image</div>
        )}
      </ProductImage>
      
      <ProductInfo>
        <ProductDetails>
          <ProductName to={`/products/${item.product.id}`}>
            {item.product.name}
          </ProductName>
          <ProductCategory>
            Category: {item.product.category.name}
          </ProductCategory>
          <ProductPrice>
            {(typeof item.product.price === 'number' ? item.product.price : 0).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })} / unit
          </ProductPrice>
        </ProductDetails>

        <ActionContainer>
          <QuantityContainer>
            <QuantityLabel>Qty:</QuantityLabel>
            <QuantityInput
              type="number"
              min="1"
            //   max={item.product.stock} // Consider removing max for UX, handle on backend/update
              value={quantity}
              onChange={handleQuantityChange}
            />
            <UpdateButton 
              onClick={handleUpdateQuantity} 
              disabled={quantity === item.quantity || isUpdating || quantity <= 0}
            >
              {isUpdating ? 'Updating...' : 'Update'}
            </UpdateButton>
          </QuantityContainer>
          
          <RemoveButton 
            onClick={handleRemoveItem}
            disabled={isRemoving}
          >
            {isRemoving ? 'Removing...' : 'Remove'}
          </RemoveButton>
          
          <TotalPrice>
            Total: {totalPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </TotalPrice>
        </ActionContainer>
      </ProductInfo>
    </CartItemContainer>
  );
};

export default CartItem; 