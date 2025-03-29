import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.fullPage ? '0' : '2rem'};
  height: ${props => props.fullPage ? '100vh' : 'auto'};
`;

const SpinnerElement = styled.div`
  width: ${props => props.size === 'small' ? '20px' : props.size === 'large' ? '50px' : '30px'};
  height: ${props => props.size === 'small' ? '20px' : props.size === 'large' ? '50px' : '30px'};
  border: ${props => props.size === 'small' ? '2px' : props.size === 'large' ? '4px' : '3px'} solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const SpinnerText = styled.p`
  margin-top: 1rem;
  font-size: ${props => props.size === 'small' ? '0.875rem' : props.size === 'large' ? '1.25rem' : '1rem'};
  color: var(--dark-gray);
`;

const Spinner = ({ 
  text, 
  size = 'medium',
  fullPage = false
}) => {
  return (
    <SpinnerContainer fullPage={fullPage}>
      <SpinnerElement size={size} />
      {text && <SpinnerText size={size}>{text}</SpinnerText>}
    </SpinnerContainer>
  );
};

export default Spinner;