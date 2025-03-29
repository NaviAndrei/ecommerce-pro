import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--dark-color);
  color: white;
  padding: 3rem 2rem 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div``;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: white;
`;

const FooterLink = styled(Link)`
  display: block;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.75rem;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: white;
  }
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const FooterCopyright = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 2rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>ShopEase</FooterTitle>
          <FooterText>
            Your one-stop destination for all your shopping needs. 
            Quality products, competitive prices, and exceptional service.
          </FooterText>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/products">Products</FooterLink>
          <FooterLink to="/cart">Shopping Cart</FooterLink>
          <FooterLink to="/profile">My Account</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Categories</FooterTitle>
          <FooterLink to="/products?category=electronics">Electronics</FooterLink>
          <FooterLink to="/products?category=clothing">Clothing</FooterLink>
          <FooterLink to="/products?category=home">Home & Kitchen</FooterLink>
          <FooterLink to="/products?category=books">Books</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contact Us</FooterTitle>
          <FooterText>
            1234 Market Street<br />
            San Francisco, CA 94103<br />
            support@shopease.com<br />
            (123) 456-7890
          </FooterText>
        </FooterSection>
      </FooterContent>
      
      <FooterCopyright>
        &copy; {currentYear} ShopEase. All rights reserved.
      </FooterCopyright>
    </FooterContainer>
  );
};

export default Footer;