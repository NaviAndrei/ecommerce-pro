import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../../store/slices/authSlice';

const StyledNavbar = styled.nav`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(45, 55, 72, 0.1);
  padding: 0.5rem 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2D3748;
  text-decoration: none;
  
  &:hover {
    color: #9AE6B4;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(45, 55, 72, 0.1);
    padding: 1rem;
  }
`;

const NavItem = styled(Link)`
  margin: 0 0.5rem;
  color: #2D3748;
  text-decoration: none;
  padding: 0.5rem;
  
  &:hover {
    color: #9AE6B4;
  }
  
  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

const CartIcon = styled(Link)`
  position: relative;
  margin: 0 0.5rem;
  color: #2D3748;
  text-decoration: none;
  font-size: 1.25rem;
  
  &:hover {
    color: #9AE6B4;
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #15803D;
  color: white;
  border-radius: 50%;
  padding: 0.1rem 0.4rem;
  font-size: 0.75rem;
`;

const Button = styled.button`
  background-color: #15803D;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #D53F8C;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #2D3748;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 1rem;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #A0AEC0;
  border-radius: 4px;
  margin-right: 0.5rem;
  color: #2D3748;
  background-color: #FFFFFF;
  
  &:focus {
    outline: none;
    border-color: #9AE6B4;
    box-shadow: 0 0 0 1px #9AE6B4;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchButton = styled.button`
  background-color: #9AE6B4;
  color: #2D3748;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #68D391;
  }
`;

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
      setSearchTerm('');
      setIsOpen(false);
    }
  };

  const cartItemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <StyledNavbar>
      <Container>
        <Logo to="/">EcoShop</Logo>
        
        <HamburgerButton onClick={() => setIsOpen(!isOpen)}>
          ☰
        </HamburgerButton>
        
        <NavLinks $isOpen={isOpen}>
          <NavItem to="/products" onClick={() => setIsOpen(false)}>Products</NavItem>
          
          {isAuthenticated ? (
            <>
              <NavItem to="/profile" onClick={() => setIsOpen(false)}>Profile</NavItem>
              <NavItem to="/orders" onClick={() => setIsOpen(false)}>Orders</NavItem>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <NavItem to="/login" onClick={() => setIsOpen(false)}>Login</NavItem>
              <NavItem to="/register" onClick={() => setIsOpen(false)}>Register</NavItem>
            </>
          )}
          
          <CartIcon to="/cart" onClick={() => setIsOpen(false)}>
            🛒
            {cartItemCount > 0 && <CartCount>{cartItemCount}</CartCount>}
          </CartIcon>
          
          <SearchContainer>
            <form onSubmit={handleSearch}>
              <SearchInput
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchButton type="submit">Search</SearchButton>
            </form>
          </SearchContainer>
        </NavLinks>
      </Container>
    </StyledNavbar>
  );
};

export default Navbar; 