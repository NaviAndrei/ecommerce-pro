import React from 'react';
import styled, { css } from 'styled-components';

const InputContainer = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
`;

const inputStyles = css`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid ${props => props.error ? 'var(--error-color)' : 'var(--light-gray)'};
  border-radius: var(--border-radius);
  background-color: ${props => props.disabled ? 'var(--light-gray)' : 'white'};
  transition: border-color 0.2s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: ${props => props.error ? 'var(--error-color)' : 'var(--primary-color)'};
    box-shadow: 0 0 0 2px ${props => props.error 
      ? 'rgba(244, 67, 54, 0.2)' 
      : 'rgba(63, 81, 181, 0.2)'};
  }
  
  &::placeholder {
    color: var(--medium-gray);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const Input = styled.input`
  ${inputStyles}
`;

const TextArea = styled.textarea`
  ${inputStyles}
  resize: vertical;
  min-height: 100px;
`;

const Select = styled.select`
  ${inputStyles}
  
  /* Custom arrow for select */
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1em;
`;

const ErrorMessage = styled.div`
  color: var(--error-color);
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const HelpText = styled.div`
  color: var(--dark-gray);
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const FormInput = ({
  id,
  label,
  type = 'text',
  error,
  helpText,
  ...props
}) => {
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <TextArea 
            id={id} 
            error={Boolean(error)} 
            {...props} 
          />
        );
      case 'select':
        return (
          <Select 
            id={id} 
            error={Boolean(error)} 
            {...props} 
          />
        );
      default:
        return (
          <Input 
            id={id} 
            type={type} 
            error={Boolean(error)} 
            {...props} 
          />
        );
    }
  };
  
  return (
    <InputContainer>
      {label && <Label htmlFor={id}>{label}</Label>}
      
      {renderInput()}
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {helpText && !error && <HelpText>{helpText}</HelpText>}
    </InputContainer>
  );
};

export default FormInput;