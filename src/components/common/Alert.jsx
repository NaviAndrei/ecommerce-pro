import React from 'react';
import styled, { css } from 'styled-components';

const variants = {
  info: css`
    background-color: var(--info-light);
    border-left-color: var(--info-color);
    
    .alert-title {
      color: var(--info-dark);
    }
  `,
  success: css`
    background-color: var(--success-light);
    border-left-color: var(--success-color);
    
    .alert-title {
      color: var(--success-dark);
    }
  `,
  warning: css`
    background-color: var(--warning-light);
    border-left-color: var(--warning-color);
    
    .alert-title {
      color: var(--warning-dark);
    }
  `,
  error: css`
    background-color: var(--error-light);
    border-left-color: var(--error-color);
    
    .alert-title {
      color: var(--error-dark);
    }
  `
};

const AlertContainer = styled.div`
  display: flex;
  padding: 1rem;
  border-radius: var(--border-radius);
  margin-bottom: 1.5rem;
  border-left: 4px solid;
  position: relative;
  
  ${props => variants[props.$variant || 'info']}
`;

const AlertContent = styled.div`
  flex: 1;
`;

const AlertTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
  font-size: 1rem;
  class-name: alert-title;
`;

const AlertMessage = styled.div`
  font-size: 0.9rem;
  color: var(--dark-color);
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
  padding: 0;
  color: var(--dark-gray);
  opacity: 0.7;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
`;

const Alert = ({
  variant = 'info',
  title,
  children,
  onDismiss,
  ...props
}) => {
  return (
    <AlertContainer $variant={variant} {...props}>
      <AlertContent>
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertMessage>{children}</AlertMessage>
      </AlertContent>
      
      {onDismiss && (
        <CloseButton type="button" onClick={onDismiss}>
          ×
        </CloseButton>
      )}
    </AlertContainer>
  );
};

export default Alert;