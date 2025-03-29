import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const AlertContainer = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: ${props => props.isClosing ? fadeOut : fadeIn} 0.3s ease-in-out;
  
  ${props => {
    switch (props.type) {
      case 'success':
        return css`
          background-color: rgba(76, 175, 80, 0.1);
          border: 1px solid var(--success-color);
          color: var(--success-color);
        `;
      case 'error':
        return css`
          background-color: rgba(244, 67, 54, 0.1);
          border: 1px solid var(--error-color);
          color: var(--error-color);
        `;
      case 'warning':
        return css`
          background-color: rgba(255, 152, 0, 0.1);
          border: 1px solid var(--warning-color);
          color: var(--warning-color);
        `;
      case 'info':
      default:
        return css`
          background-color: rgba(33, 150, 243, 0.1);
          border: 1px solid var(--info-color);
          color: var(--info-color);
        `;
    }
  }}
`;

const AlertContent = styled.div`
  flex: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  margin-left: 1rem;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
  }
`;

const Alert = ({ 
  type = 'info', 
  message, 
  dismissible = true,
  timeout = 0,
  onClose 
}) => {
  const [visible, setVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  
  const handleClose = () => {
    setIsClosing(true);
    
    // Wait for animation to complete before removing from DOM
    setTimeout(() => {
      setVisible(false);
      
      if (onClose) {
        onClose();
      }
    }, 300);
  };
  
  useEffect(() => {
    // If timeout is provided, automatically close after that duration
    if (timeout > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, timeout);
      
      return () => clearTimeout(timer);
    }
  }, [timeout]);
  
  if (!visible) {
    return null;
  }
  
  return (
    <AlertContainer type={type} isClosing={isClosing}>
      <AlertContent>{message}</AlertContent>
      
      {dismissible && (
        <CloseButton onClick={handleClose} aria-label="Close alert">
          ×
        </CloseButton>
      )}
    </AlertContainer>
  );
};

export default Alert;