import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { updateCartItem, removeFromCart } from '../../store/slices/cartSlice';

const CartItemContainer = styled.div`
  display: flex;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProductImage = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin-right: 1.5rem;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1rem;
  }
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const ProductInfo = styled.div`
  flex-grow: 1;
`;

const ProductName = styled(Link)`
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  
  &:hover {
    color: #007bff;
  }
`;

const ProductPrice = styled.div`
  margin-top: 0.5rem;
  color: #28a745;
  font-weight: bold;
`;

const ProductCategory = styled.div`
  margin-top: 0.25rem;
  font-size: 0.9rem;
  color: #6c757d;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
  
  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const QuantityLabel = styled.span`
  margin-right: 0.5rem;
`;

const QuantityInput = styled.input`
  width: 50px;
  padding: 0.25rem 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

const UpdateButton = styled.button`
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 0.5rem;
  
  &:hover {
    background-color: #5a6268;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #c82333;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TotalPrice = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  margin-left: auto;
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 0.5rem;
    width: 100%;
  }
`;

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= item.product.stock) {
      setQuantity(value);
    }
  };
  
  const handleUpdateQuantity = async () => {
    if (quantity !== item.quantity) {
      setIsUpdating(true);
      try {
        await dispatch(updateCartItem({
          itemId: item.id,
          quantity
        })).unwrap();
      } catch (error) {
        console.error('Failed to update quantity:', error);
      } finally {
        setIsUpdating(false);
      }
    }
  };
  
  const handleRemoveItem = async () => {
    setIsRemoving(true);
    try {
      await dispatch(removeFromCart(item.id)).unwrap();
    } catch (error) {
      console.error('Failed to remove item:', error);
    } finally {
      setIsRemoving(false);
    }
  };
  
  // Calculate item total price
  const totalPrice = item.product.price * item.quantity;
  
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
        <ProductName to={`/products/${item.product.id}`}>
          {item.product.name}
        </ProductName>
        
        <ProductCategory>
          Category: {item.product.category.name}
        </ProductCategory>
        
        <ProductPrice>
          ${item.product.price.toFixed(2)}
        </ProductPrice>
        
        <ActionContainer>
          <QuantityContainer>
            <QuantityLabel>Qty:</QuantityLabel>
            <QuantityInput
              type="number"
              min="1"
              max={item.product.stock}
              value={quantity}
              onChange={handleQuantityChange}
            />
            <UpdateButton 
              onClick={handleUpdateQuantity} 
              disabled={quantity === item.quantity || isUpdating}
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
            Total: ${totalPrice.toFixed(2)}
          </TotalPrice>
        </ActionContainer>
      </ProductInfo>
    </CartItemContainer>
  );
};

export default CartItem;
