import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from '../common/Spinner';
import Button from '../common/Button';

const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OrderItem = styled.div`
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--box-shadow);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderId = styled.h4`
  margin: 0;
  color: var(--primary-color);
`;

const OrderDate = styled.p`
  margin: 0;
  color: var(--dark-gray);
  font-size: 0.9rem;
`;

const OrderAmount = styled.p`
  font-weight: 600;
  font-size: 1.1rem;
  margin: 0;
`;

const OrderStatus = styled.div`
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-block;
  
  ${props => {
    switch (props.status) {
      case 'delivered':
        return `
          background-color: rgba(76, 175, 80, 0.1);
          color: var(--success-color);
        `;
      case 'shipped':
        return `
          background-color: rgba(33, 150, 243, 0.1);
          color: var(--info-color);
        `;
      case 'processing':
        return `
          background-color: rgba(255, 152, 0, 0.1);
          color: var(--warning-color);
        `;
      case 'cancelled':
        return `
          background-color: rgba(244, 67, 54, 0.1);
          color: var(--error-color);
        `;
      default:
        return `
          background-color: rgba(158, 158, 158, 0.1);
          color: var(--dark-gray);
        `;
    }
  }}
`;

const Divider = styled.div`
  height: 1px;
  background-color: var(--light-gray);
  margin: 1rem 0;
`;

const OrderItems = styled.div`
  margin-bottom: 1rem;
`;

const OrderItemSummary = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1rem;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ItemName = styled.p`
  margin: 0;
  font-weight: 500;
`;

const ItemQuantity = styled.p`
  margin: 0;
  color: var(--dark-gray);
`;

const ItemPrice = styled.p`
  margin: 0;
  text-align: right;
  font-weight: 500;
`;

const EmptyOrders = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: var(--light-gray);
  border-radius: var(--border-radius);
`;

const EmptyTitle = styled.h4`
  margin-bottom: 0.5rem;
`;

const EmptyMessage = styled.p`
  margin-bottom: 1.5rem;
  color: var(--dark-gray);
`;

const OrderHistory = ({ orders = [], loading = false }) => {
  // Format date to readable string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  // Capitalize status
  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };
  
  if (loading) {
    return <Spinner text="Loading orders..." />;
  }
  
  if (orders.length === 0) {
    return (
      <EmptyOrders>
        <EmptyTitle>No orders yet</EmptyTitle>
        <EmptyMessage>
          You haven't placed any orders yet. Start shopping to place your first order.
        </EmptyMessage>
        <Button 
          as={Link} 
          to="/products"
          variant="primary"
        >
          Browse Products
        </Button>
      </EmptyOrders>
    );
  }
  
  return (
    <OrdersContainer>
      {orders.map(order => (
        <OrderItem key={order.id}>
          <OrderHeader>
            <OrderInfo>
              <OrderId>Order #{order.id}</OrderId>
              <OrderDate>{formatDate(order.created_at)}</OrderDate>
            </OrderInfo>
            
            <div>
              <OrderStatus status={order.status}>
                {formatStatus(order.status)}
              </OrderStatus>
            </div>
          </OrderHeader>
          
          <OrderItems>
            {order.items.slice(0, 2).map(item => (
              <OrderItemSummary key={item.id}>
                <ItemName>{item.product.name}</ItemName>
                <ItemQuantity>Qty: {item.quantity}</ItemQuantity>
                <ItemPrice>{formatCurrency(item.price)}</ItemPrice>
              </OrderItemSummary>
            ))}
            
            {order.items.length > 2 && (
              <ItemName>
                + {order.items.length - 2} more item(s)
              </ItemName>
            )}
          </OrderItems>
          
          <Divider />
          
          <OrderHeader>
            <Button 
              as={Link} 
              to={`/orders/${order.id}`}
              variant="outline"
              size="small"
            >
              View Order Details
            </Button>
            
            <OrderAmount>
              Total: {formatCurrency(order.total_amount)}
            </OrderAmount>
          </OrderHeader>
        </OrderItem>
      ))}
    </OrdersContainer>
  );
};

export default OrderHistory;