import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--primary-dark);
  color: white;
  padding: 2rem 0 1rem;
`;

const FooterContent = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
  text-decoration: none;
  font-weight: 400;
  
  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
  font-weight: 400;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 1.5rem;
  
  &:hover {
    color: var(--secondary-color);
  }
`;

const Copyright = styled.div`
  max-width: var(--max-width);
  margin: 2rem auto 0;
  padding: 1rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <SectionTitle>ShopEase</SectionTitle>
          <FooterText>
            Your one-stop shop for all your shopping needs. Quality products, 
            competitive prices, and exceptional customer service.
          </FooterText>
        </FooterSection>
        
        <FooterSection>
          <SectionTitle>Shop</SectionTitle>
          <FooterLink to="/products">All Products</FooterLink>
          <FooterLink to="/products?category=1">Electronics</FooterLink>
          <FooterLink to="/products?category=2">Clothing</FooterLink>
          <FooterLink to="/products?category=3">Home & Garden</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <SectionTitle>Customer Service</SectionTitle>
          <FooterLink to="/contact">Contact Us</FooterLink>
          <FooterLink to="/shipping">Shipping Policy</FooterLink>
          <FooterLink to="/returns">Returns & Refunds</FooterLink>
          <FooterLink to="/faq">FAQ</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <SectionTitle>Account</SectionTitle>
          <FooterLink to="/login">Login</FooterLink>
          <FooterLink to="/register">Register</FooterLink>
          <FooterLink to="/profile">My Account</FooterLink>
          <FooterLink to="/orders">Order History</FooterLink>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        &copy; {currentYear} ShopEase. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;