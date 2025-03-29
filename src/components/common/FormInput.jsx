import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--dark-color);
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.$error ? 'var(--error-color)' : 'var(--border-color)'};
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: border 0.2s;
  background-color: ${props => props.disabled ? 'var(--light-bg)' : 'white'};
  
  &:focus {
    outline: none;
    border-color: ${props => props.$error ? 'var(--error-color)' : 'var(--primary-color)'};
    box-shadow: 0 0 0 2px ${props => props.$error ? 'var(--error-light)' : 'var(--primary-light)'};
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.$error ? 'var(--error-color)' : 'var(--border-color)'};
  border-radius: var(--border-radius);
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border 0.2s;
  background-color: ${props => props.disabled ? 'var(--light-bg)' : 'white'};
  
  &:focus {
    outline: none;
    border-color: ${props => props.$error ? 'var(--error-color)' : 'var(--primary-color)'};
    box-shadow: 0 0 0 2px ${props => props.$error ? 'var(--error-light)' : 'var(--primary-light)'};
  }
`;

const ErrorText = styled.div`
  color: var(--error-color);
  font-size: 0.85rem;
  margin-top: 0.5rem;
`;

const HelperText = styled.div`
  color: var(--dark-gray);
  font-size: 0.85rem;
  margin-top: 0.5rem;
`;

const FormInput = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  error,
  helperText,
  ...rest
}) => {
  return (
    <InputContainer>
      {label && <Label htmlFor={id}>{label}</Label>}
      
      {type === 'textarea' ? (
        <StyledTextarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          $error={!!error}
          {...rest}
        />
      ) : (
        <StyledInput
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          $error={!!error}
          {...rest}
        />
      )}
      
      {error && <ErrorText>{error}</ErrorText>}
      {helperText && !error && <HelperText>{helperText}</HelperText>}
    </InputContainer>
  );
};

export default FormInput;