import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledFooter = styled.footer`
  background-color: #2D3748; /* Charcoal Background */
  color: #A0AEC0; /* Light Gray text */
  padding: 2rem 0;
  margin-top: 2rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  margin-right: 2rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #F7FAFC; /* Lighter Gray/Off-white */
`;

const FooterLink = styled(Link)`
  display: block;
  color: #A0AEC0; /* Light Gray */
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.3s;

  &:hover {
    color: #9AE6B4; /* Mint Green */
  }
`;

const ExternalLink = styled.a`
  display: block;
  color: #A0AEC0; /* Light Gray */
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.3s;
  
  &:hover {
    color: #9AE6B4; /* Mint Green */
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #4A5568; /* Darker Gray border */
  color: #A0AEC0; /* Light Gray */
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <StyledFooter>
      <Container>
        <FooterContent>
          <FooterSection>
            <SectionTitle>EcoShop</SectionTitle>
            <p>Your one-stop shop for all your needs.</p>
            <p>Quality products at affordable prices.</p>
          </FooterSection>
          
          <FooterSection>
            <SectionTitle>Shop</SectionTitle>
            <FooterLink to="/products">All Products</FooterLink>
            <FooterLink to="/products?category=1">Electronics</FooterLink>
            <FooterLink to="/products?category=2">Clothing</FooterLink>
            <FooterLink to="/products?category=3">Home & Kitchen</FooterLink>
          </FooterSection>
          
          <FooterSection>
            <SectionTitle>Customer Service</SectionTitle>
            <FooterLink to="/contact">Contact Us</FooterLink>
            <FooterLink to="/faq">FAQ</FooterLink>
            <FooterLink to="/shipping">Shipping Information</FooterLink>
            <FooterLink to="/returns">Returns & Exchanges</FooterLink>
          </FooterSection>
          
          <FooterSection>
            <SectionTitle>Follow Us</SectionTitle>
            <ExternalLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</ExternalLink>
            <ExternalLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</ExternalLink>
            <ExternalLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</ExternalLink>
            <ExternalLink href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</ExternalLink>
          </FooterSection>
        </FooterContent>
        
        <FooterBottom>
          <p>&copy; {currentYear} EcoShop. All rights reserved.</p>
        </FooterBottom>
      </Container>
    </StyledFooter>
  );
};

export default Footer; 