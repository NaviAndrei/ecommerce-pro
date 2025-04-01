import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #666b7d;
  border: 1px solid #4A5568;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #F7FAFC;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const CardImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4A5568;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const NoImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #CBD5E0;
  font-size: 1rem;
`;

const CardBody = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #F7FAFC;
  font-weight: 600;
`;

const CardCategory = styled.div`
  font-size: 0.8rem;
  color: #CBD5E0;
  margin-bottom: 0.5rem;
`;

const CardPrice = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  color: #9AE6B4;
  margin-top: auto;
  margin-bottom: 0.75rem;
`;

const StockInfo = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: ${props => props.$inStock ? '#9AE6B4' : '#FEB2B2'};
  margin-bottom: 1rem;
`;

const ViewButton = styled(Link)`
  display: block;
  text-align: center;
  background-color: #ED64A6;
  color: white;
  font-weight: bold;
  text-decoration: none;
  padding: 0.6rem;
  border-radius: 4px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #D53F8C;
  }
`;

const ProductCard = ({ product }) => {
  return (
    <Card>
      <CardImageContainer>
        {product.image_url || product.name.toLowerCase().includes('coffee maker') ? (
          <CardImage 
            src={product.name.toLowerCase().includes('coffee maker') ? 
              'https://images.pexels.com/photos/2147683/pexels-photo-2147683.jpeg' : 
              product.image_url
            } 
            alt={product.name} 
          />
        ) : (
          <NoImage>No image available</NoImage>
        )}
      </CardImageContainer>
      
      <CardBody>
        <CardTitle>{product.name}</CardTitle>
        <CardCategory>{product.category.name}</CardCategory>
        <CardPrice>
          {(typeof product.price === 'number' ? product.price : 0).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
        </CardPrice>
        <StockInfo $inStock={product.stock > 0}>
          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </StockInfo>
        <ViewButton to={`/products/${product.id}`}>
          View Details
        </ViewButton>
      </CardBody>
    </Card>
  );
};

export default ProductCard; 