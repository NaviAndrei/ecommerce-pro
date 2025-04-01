import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchProductById, clearCurrentProduct } from '../../store/slices/productsSlice';
import { addToCart } from '../../store/slices/cartSlice';

const ProductContainer = styled.div`
  padding: 2rem 0;
`;

const BreadcrumbNav = styled.nav`
  margin-bottom: 1.5rem;
  color: #6c757d;
  
  a {
    color: #007bff;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ProductContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductImageContainer = styled.div`
  text-align: center;
`;

const ProductImage = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #28a745;
  margin-bottom: 1rem;
`;

const ProductCategory = styled.div`
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 1rem;
`;

const ProductDescription = styled.div`
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const StockInfo = styled.div`
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: ${props => props.inStock ? '#28a745' : '#dc3545'};
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const QuantityLabel = styled.span`
  margin-right: 1rem;
`;

const QuantityInput = styled.input`
  width: 60px;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

const AddToCartButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #0069d9;
  }
  
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  margin-top: 1rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 1.5rem;
`;

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector(state => state.products);
  const { isAuthenticated } = useSelector(state => state.auth);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    dispatch(fetchProductById(id));
    
    // Cleanup on unmount
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (product?.stock || 0)) {
      setQuantity(value);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/products/${id}` } });
      return;
    }
    
    setAddingToCart(true);
    setErrorMessage('');
    
    try {
      await dispatch(addToCart({
        product_id: product.id,
        quantity
      })).unwrap();
      
      // Show success notification or redirect to cart
      alert(`${product.name} added to cart!`);
    } catch (error) {
      setErrorMessage(error || 'Failed to add item to cart. Please try again.');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading || !product) {
    return <LoadingSpinner>Loading product details...</LoadingSpinner>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ProductContainer>
      <BreadcrumbNav>
        <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</span>
        {' > '}
        <span onClick={() => navigate('/products')} style={{ cursor: 'pointer' }}>Products</span>
        {' > '}
        <span>{product.name}</span>
      </BreadcrumbNav>
      
      <ProductContentGrid>
        <ProductImageContainer>
          <ProductImage>
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} />
            ) : (
              <div style={{ fontSize: '2rem', color: '#6c757d' }}>
                No Image Available
              </div>
            )}
          </ProductImage>
        </ProductImageContainer>
        
        <ProductInfo>
          <ProductTitle>{product.name}</ProductTitle>
          
          <ProductCategory>
            Category: {product.category.name}
          </ProductCategory>
          
          <ProductPrice>
            {(typeof product.price === 'number' ? product.price : 0).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </ProductPrice>
          
          <StockInfo inStock={product.stock > 0}>
            {product.stock > 0 
              ? `In Stock (${product.stock} available)` 
              : 'Out of Stock'}
          </StockInfo>
          
          <ProductDescription>
            {product.description}
          </ProductDescription>
          
          <QuantityContainer>
            <QuantityLabel>Quantity:</QuantityLabel>
            <QuantityInput
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={handleQuantityChange}
              disabled={product.stock <= 0}
            />
          </QuantityContainer>
          
          <AddToCartButton 
            onClick={handleAddToCart} 
            disabled={product.stock <= 0 || addingToCart}
          >
            {addingToCart ? 'Adding...' : 'Add to Cart'}
          </AddToCartButton>
          
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </ProductInfo>
      </ProductContentGrid>
    </ProductContainer>
  );
};

export default ProductDetail; 