import React from 'react';
import styled, { css } from 'styled-components';

const ButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.size === 'small' 
    ? '0.5rem 1rem' 
    : props.size === 'large' 
      ? '0.75rem 1.5rem' 
      : '0.625rem 1.25rem'};
  font-size: ${props => props.size === 'small' 
    ? '0.875rem' 
    : props.size === 'large' 
      ? '1.125rem' 
      : '1rem'};
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return css`
          background-color: var(--primary-color);
          color: white;
          
          &:hover, &:focus {
            background-color: var(--primary-dark);
          }
          
          &:disabled {
            background-color: var(--medium-gray);
            cursor: not-allowed;
          }
        `;
      case 'secondary':
        return css`
          background-color: var(--light-gray);
          color: var(--text-color);
          
          &:hover, &:focus {
            background-color: var(--medium-gray);
          }
          
          &:disabled {
            color: var(--medium-gray);
            cursor: not-allowed;
          }
        `;
      case 'danger':
        return css`
          background-color: var(--error-color);
          color: white;
          
          &:hover, &:focus {
            opacity: 0.9;
          }
          
          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          color: var(--primary-color);
          border: 1px solid var(--primary-color);
          
          &:hover, &:focus {
            background-color: var(--primary-color);
            color: white;
          }
          
          &:disabled {
            color: var(--medium-gray);
            border-color: var(--medium-gray);
            cursor: not-allowed;
          }
        `;
      case 'text':
        return css`
          background-color: transparent;
          color: var(--primary-color);
          padding: 0;
          
          &:hover, &:focus {
            text-decoration: underline;
          }
          
          &:disabled {
            color: var(--medium-gray);
            cursor: not-allowed;
          }
        `;
      default:
        return css`
          background-color: var(--primary-color);
          color: white;
          
          &:hover, &:focus {
            background-color: var(--primary-dark);
          }
          
          &:disabled {
            background-color: var(--medium-gray);
            cursor: not-allowed;
          }
        `;
    }
  }}
  
  ${props => props.fullWidth && css`
    width: 100%;
  `}
`;

const StyledButton = styled.button`${ButtonStyles}`;
const StyledLink = styled.a`${ButtonStyles}`;

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  type = 'button',
  fullWidth = false,
  as,
  ...props 
}) => {
  const Component = as ? StyledLink : StyledButton;
  
  return (
    <Component
      variant={variant}
      size={size}
      type={type}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;