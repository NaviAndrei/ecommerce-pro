import React from 'react';
import styled, { css } from 'styled-components';

const variants = {
  primary: css`
    background-color: var(--primary-color);
    color: white;
    &:hover:not(:disabled) {
      background-color: var(--primary-dark);
    }
  `,
  secondary: css`
    background-color: var(--secondary-color);
    color: white;
    &:hover:not(:disabled) {
      background-color: var(--secondary-dark);
    }
  `,
  success: css`
    background-color: var(--success-color);
    color: white;
    &:hover:not(:disabled) {
      background-color: var(--success-dark);
    }
  `,
  danger: css`
    background-color: var(--error-color);
    color: white;
    &:hover:not(:disabled) {
      background-color: var(--error-dark);
    }
  `,
  outline: css`
    background-color: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    &:hover:not(:disabled) {
      background-color: var(--primary-light);
    }
  `,
  text: css`
    background-color: transparent;
    color: var(--primary-color);
    padding: 0.5rem;
    &:hover:not(:disabled) {
      background-color: var(--primary-light);
    }
  `
};

const sizes = {
  small: css`
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  `,
  medium: css`
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  `,
  large: css`
    padding: 1rem 2rem;
    font-size: 1.125rem;
  `
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-family: inherit;
  text-decoration: none;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  ${props => variants[props.$variant || 'primary']}
  ${props => sizes[props.$size || 'medium']}
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  svg {
    margin-right: ${props => props.children ? '0.5rem' : '0'};
  }
`;

const Button = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  children,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;