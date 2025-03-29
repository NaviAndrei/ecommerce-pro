import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchOrders, fetchOrderById, clearCurrentOrder } from '../../store/slices/ordersSlice';

const OrdersContainer = styled.div`
  padding: 2rem 0;
`;

const OrdersTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const OrderCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  background-color: #fff;
  transition: box-shadow 0.3s;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const OrderId = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

const OrderDate = styled.span`
  color: #6c757d;
  font-size: 0.9rem;
`;

const OrderStatus = styled.div`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  text-transform: capitalize;
  background-color: ${props => {
    switch (props.status) {
      case 'pending':
        return '#fff3cd';
      case 'processing':
        return '#d1ecf1';
      case 'shipped':
        return '#d4edda';
      case 'delivered':
        return '#c3e6cb';
      case 'cancelled':
        return '#f8d7da';
      default:
        return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'pending':
        return '#856404';
      case 'processing':
        return '#0c5460';
      case 'shipped':
        return '#155724';
      case 'delivered':
        return '#155724';
      case 'cancelled':
        return '#721c24';
      default:
        return '#383d41';
    }
  }};
`;

const OrderMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const OrderMetaItem = styled.div`
  flex: 1;
  margin-right: 1rem;
  
  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
  
  span {
    font-weight: bold;
    display: block;
    margin-bottom: 0.25rem;
  }
`;

const OrderTotal = styled.div`
  text-align: right;
  font-size: 1.1rem;
  font-weight: bold;
  color: #28a745;
`;

const OrderDetails = styled.div`
  margin-top: 1rem;
`;

const OrderItemsList = styled.div`
  margin-top: 1rem;
`;

const OrderItem = styled.div`
  display: flex;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  border-radius: 4px;
  
  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const ItemDetails = styled.div`
  flex-grow: 1;
`;

const ItemName = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const ItemPrice = styled.div`
  color: #28a745;
`;

const ItemQuantity = styled.div`
  font-size: 0.9rem;
  color: #6c757d;
`;

const DetailButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  font-size: 0.9rem;
  
  &:hover {
    color: #0056b3;
  }
`;

const NoOrdersMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #6c757d;
  border: 1px dashed #e0e0e0;
  border-radius: 8px;
`;

const ShopNowButton = styled(Link)`
  display: inline-block;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  
  &:hover {
    background-color: #0069d9;
    color: white;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  
  &:hover {
    color: #0056b3;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.5rem;
`;

const OrderHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, order, loading, count } = useSelector(state => state.orders);
  const { isAuthenticated } = useSelector(state => state.auth);
  
  const [viewingOrderDetails, setViewingOrderDetails] = useState(false);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/orders' } });
      return;
    }
    
    if (!viewingOrderDetails) {
      dispatch(fetchOrders());
    }
    
    return () => {
      // Clean up order details when leaving the page
      dispatch(clearCurrentOrder());
    };
  }, [dispatch, navigate, isAuthenticated, viewingOrderDetails]);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleViewOrderDetails = (orderId) => {
    dispatch(fetchOrderById(orderId));
    setViewingOrderDetails(true);
  };
  
  const handleBackToOrders = () => {
    setViewingOrderDetails(false);
    dispatch(clearCurrentOrder());
  };
  
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }
  
  if (loading && !viewingOrderDetails) {
    return <LoadingSpinner>Loading your orders...</LoadingSpinner>;
  }
  
  // Render order details view
  if (viewingOrderDetails && order) {
    return (
      <OrdersContainer>
        <BackButton onClick={handleBackToOrders}>
          ← Back to All Orders
        </BackButton>
        
        <OrdersTitle>Order #{order.id}</OrdersTitle>
        
        <OrderCard>
          <OrderHeader>
            <div>
              <OrderId>Order #{order.id}</OrderId>
              <OrderDate>Placed on {formatDate(order.created_at)}</OrderDate>
            </div>
            <OrderStatus status={order.status}>
              {order.status}
            </OrderStatus>
          </OrderHeader>
          
          <OrderMeta>
            <OrderMetaItem>
              <span>Shipping Address</span>
              {order.address}
            </OrderMetaItem>
            
            <OrderMetaItem>
              <span>Contact Information</span>
              {order.full_name}<br />
              {order.email}<br />
              {order.phone_number}
            </OrderMetaItem>
          </OrderMeta>
          
          <OrderDetails>
            <h4>Order Items</h4>
            <OrderItemsList>
              {order.items.map(item => (
                <OrderItem key={item.id}>
                  <ItemImage>
                    {item.product.image_url ? (
                      <img 
                        src={item.product.image_url} 
                        alt={item.product.name} 
                        style={{ maxWidth: '100%', maxHeight: '100%' }} 
                      />
                    ) : (
                      <div>No image</div>
                    )}
                  </ItemImage>
                  
                  <ItemDetails>
                    <ItemName>{item.product.name}</ItemName>
                    <ItemPrice>${item.price.toFixed(2)} per unit</ItemPrice>
                    <ItemQuantity>Quantity: {item.quantity}</ItemQuantity>
                  </ItemDetails>
                  
                  <div style={{ textAlign: 'right' }}>
                    <div>
                      <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                  </div>
                </OrderItem>
              ))}
            </OrderItemsList>
          </OrderDetails>
          
          <OrderTotal>
            Total: ${order.total_amount.toFixed(2)}
          </OrderTotal>
        </OrderCard>
      </OrdersContainer>
    );
  }
  
  // Render orders list view
  return (
    <OrdersContainer>
      <OrdersTitle>My Orders</OrdersTitle>
      
      {orders.length === 0 ? (
        <NoOrdersMessage>
          <div>You haven't placed any orders yet</div>
          <p>Start shopping to see your orders here</p>
          <ShopNowButton to="/products">Shop Now</ShopNowButton>
        </NoOrdersMessage>
      ) : (
        orders.map(order => (
          <OrderCard key={order.id}>
            <OrderHeader>
              <div>
                <OrderId>Order #{order.id}</OrderId>
                <OrderDate>Placed on {formatDate(order.created_at)}</OrderDate>
              </div>
              <OrderStatus status={order.status}>
                {order.status}
              </OrderStatus>
            </OrderHeader>
            
            <OrderMeta>
              <OrderMetaItem>
                <span>Shipping To</span>
                {order.full_name}
              </OrderMetaItem>
              
              <OrderMetaItem>
                <span>Total</span>
                ${order.total_amount.toFixed(2)}
              </OrderMetaItem>
            </OrderMeta>
            
            <DetailButton onClick={() => handleViewOrderDetails(order.id)}>
              View Order Details
            </DetailButton>
          </OrderCard>
        ))
      )}
    </OrdersContainer>
  );
};

export default OrderHistory;
