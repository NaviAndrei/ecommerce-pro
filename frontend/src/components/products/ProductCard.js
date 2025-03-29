import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CardImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
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
  color: #6c757d;
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
  color: #333;
`;

const CardCategory = styled.div`
  font-size: 0.8rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
`;

const CardPrice = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  color: #28a745;
  margin-top: auto;
`;

const StockInfo = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: ${props => props.inStock ? '#28a745' : '#dc3545'};
`;

const ViewButton = styled(Link)`
  display: block;
  text-align: center;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  margin-top: 1rem;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #0069d9;
  }
`;

const ProductCard = ({ product }) => {
  return (
    <Card>
      <CardImageContainer>
        {product.image_url ? (
          <CardImage src={product.image_url} alt={product.name} />
        ) : (
          <NoImage>No image available</NoImage>
        )}
      </CardImageContainer>
      
      <CardBody>
        <CardTitle>{product.name}</CardTitle>
        <CardCategory>{product.category.name}</CardCategory>
        <CardPrice>${product.price.toFixed(2)}</CardPrice>
        <StockInfo inStock={product.stock > 0}>
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
