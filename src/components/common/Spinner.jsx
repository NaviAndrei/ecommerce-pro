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
  margin: ${props => props.$inline ? '0' : '2rem'} auto;
`;

const SpinnerCircle = styled.div`
  width: ${props => props.$size === 'small' ? '1.5rem' : props.$size === 'large' ? '3rem' : '2rem'};
  height: ${props => props.$size === 'small' ? '1.5rem' : props.$size === 'large' ? '3rem' : '2rem'};
  border: ${props => props.$size === 'small' ? '2px' : '3px'} solid var(--border-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const SpinnerText = styled.p`
  margin-top: 1rem;
  color: var(--dark-gray);
  font-size: ${props => props.$size === 'small' ? '0.875rem' : '1rem'};
`;

const Spinner = ({
  size = 'medium',
  text,
  inline = false,
}) => {
  return (
    <SpinnerContainer $inline={inline}>
      <SpinnerCircle $size={size} />
      {text && <SpinnerText $size={size}>{text}</SpinnerText>}
    </SpinnerContainer>
  );
};

export default Spinner;