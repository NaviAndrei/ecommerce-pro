import React from 'react';
import styled from 'styled-components';
import Spinner from '../common/Spinner';

const OrderHistoryContainer = styled.div``;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--dark-gray);
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OrderCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  overflow: hidden;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--light-bg);
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const OrderDetails = styled.div``;

const OrderDate = styled.div`
  color: var(--dark-gray);
  font-size: 0.9rem;
`;

const OrderStatus = styled.div`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
  background-color: ${props => {
    switch (props.$status) {
      case 'pending':
        return 'var(--warning-light)';
      case 'processing':
        return 'var(--info-light)';
      case 'shipped':
        return 'var(--primary-light)';
      case 'delivered':
        return 'var(--success-light)';
      case 'cancelled':
        return 'var(--error-light)';
      default:
        return 'var(--light-gray)';
    }
  }};
  color: ${props => {
    switch (props.$status) {
      case 'pending':
        return 'var(--warning-dark)';
      case 'processing':
        return 'var(--info-dark)';
      case 'shipped':
        return 'var(--primary-dark)';
      case 'delivered':
        return 'var(--success-dark)';
      case 'cancelled':
        return 'var(--error-dark)';
      default:
        return 'var(--dark-gray)';
    }
  }};
`;

const OrderBody = styled.div`
  padding: 1rem;
`;

const OrderItems = styled.div`
  margin-bottom: 1.5rem;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  align-items: center;
`;

const ItemName = styled.div`
  font-weight: 500;
`;

const ItemQuantity = styled.div`
  color: var(--dark-gray);
  margin-left: 0.5rem;
`;

const ItemPrice = styled.div`
  font-weight: 500;
`;

const OrderSummary = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
`;

const OrderTotal = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
`;

const OrderHistory = ({ orders, loading }) => {
  if (loading) {
    return <Spinner text="Loading orders..." />;
  }
  
  if (!orders || orders.length === 0) {
    return (
      <EmptyMessage>
        <p>You haven't placed any orders yet.</p>
      </EmptyMessage>
    );
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  return (
    <OrderHistoryContainer>
      <OrderList>
        {orders.map(order => (
          <OrderCard key={order.id}>
            <OrderHeader>
              <OrderDetails>
                <div><strong>Order #{order.id}</strong></div>
                <OrderDate>{formatDate(order.created_at)}</OrderDate>
              </OrderDetails>
              <OrderStatus $status={order.status}>{order.status}</OrderStatus>
            </OrderHeader>
            <OrderBody>
              <OrderItems>
                {order.items.map(item => (
                  <OrderItem key={item.id}>
                    <ItemDetails>
                      <ItemName>{item.product.name}</ItemName>
                      <ItemQuantity>x{item.quantity}</ItemQuantity>
                    </ItemDetails>
                    <ItemPrice>{formatCurrency(item.price * item.quantity)}</ItemPrice>
                  </OrderItem>
                ))}
              </OrderItems>
              <OrderSummary>
                <div><strong>Total</strong></div>
                <OrderTotal>{formatCurrency(order.total_amount)}</OrderTotal>
              </OrderSummary>
            </OrderBody>
          </OrderCard>
        ))}
      </OrderList>
    </OrderHistoryContainer>
  );
};

export default OrderHistory;