import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: bold;
  color: #f8f9fa;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0;
`;

const ErrorTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #343a40;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: #6c757d;
  max-width: 500px;
  margin-bottom: 2rem;
`;

const HomeButton = styled(Link)`
  background-color: #007bff;
  color: white;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #0069d9;
    color: white;
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <ErrorTitle>Page Not Found</ErrorTitle>
      <ErrorMessage>
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </ErrorMessage>
      <HomeButton to="/">Return to Homepage</HomeButton>
    </NotFoundContainer>
  );
};

export default NotFoundPage; 