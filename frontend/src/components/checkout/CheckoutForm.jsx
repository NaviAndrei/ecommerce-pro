import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  
  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  min-height: 100px;
  
  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const SubmitButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: bold;
  margin-top: 1rem;
  
  &:hover {
    background-color: #218838;
  }
  
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  background-color: #f8d7da;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const RequiredAsterisk = styled.span`
  color: #dc3545;
  margin-left: 0.25rem;
`;

const CheckoutForm = ({ formData, onChange, onSubmit, isLoading, error }) => {
  return (
    <FormContainer>
      <h2>Shipping Information</h2>
      
      {error && (
        <ErrorMessage>
          {typeof error === 'object' 
            ? Object.keys(error).map(key => (
                <div key={key}>{key}: {error[key]}</div>
              ))
            : error}
        </ErrorMessage>
      )}
      
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label htmlFor="full_name">
            Full Name<RequiredAsterisk>*</RequiredAsterisk>
          </Label>
          <Input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={onChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="email">
            Email<RequiredAsterisk>*</RequiredAsterisk>
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="address">
            Shipping Address<RequiredAsterisk>*</RequiredAsterisk>
          </Label>
          <TextArea
            id="address"
            name="address"
            value={formData.address}
            onChange={onChange}
            required
            placeholder="Street address, city, state, zip code, country"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="phone_number">
            Phone Number<RequiredAsterisk>*</RequiredAsterisk>
          </Label>
          <Input
            type="tel"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={onChange}
            required
          />
        </FormGroup>
        
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Place Order'}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default CheckoutForm; 