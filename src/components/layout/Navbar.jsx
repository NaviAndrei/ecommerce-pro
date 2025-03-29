import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { logout } from '../../store/slices/authSlice';

const NavContainer = styled.header`
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
`;

const MenuButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  
  @media (min-width: 768px) {
    display: none;
  }
  
  div {
    width: 30px;
    height: 3px;
    background-color: var(--dark-color);
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    
    &:first-child {
      transform: ${({ $isOpen }) => ($isOpen ? 'rotate(45deg)' : 'rotate(0)')};
    }
    
    &:nth-child(2) {
      opacity: ${({ $isOpen }) => ($isOpen ? '0' : '1')};
      transform: ${({ $isOpen }) => ($isOpen ? 'translateX(20px)' : 'translateX(0)')};
    }
    
    &:nth-child(3) {
      transform: ${({ $isOpen }) => ($isOpen ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 767px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 250px;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
    background-color: white;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform 0.3s ease-in-out;
    z-index: 5;
    
    a, button {
      margin: 0.5rem 0;
    }
  }
`;

const NavOverlay = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  margin: 0 1rem;
  color: var(--dark-color);
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const NavButton = styled.button`
  margin: 0 1rem;
  color: var(--dark-color);
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const CartCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  margin-left: 5px;
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    closeMenu();
  };
  
  const cartItemsCount = items?.reduce((total, item) => total + item.quantity, 0) || 0;
  
  return (
    <NavContainer>
      <NavWrapper>
        <Logo to="/">
          ShopEase
        </Logo>
        
        <MenuButton 
          $isOpen={isMenuOpen} 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <div />
          <div />
          <div />
        </MenuButton>
        
        <NavMenu $isOpen={isMenuOpen}>
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/products" onClick={closeMenu}>Products</NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/profile" onClick={closeMenu}>Profile</NavLink>
              <NavButton onClick={handleLogout}>Logout</NavButton>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={closeMenu}>Login</NavLink>
              <NavLink to="/register" onClick={closeMenu}>Register</NavLink>
            </>
          )}
          <NavLink to="/cart" onClick={closeMenu}>
            Cart
            {cartItemsCount > 0 && <CartCount>{cartItemsCount}</CartCount>}
          </NavLink>
        </NavMenu>
        
        <NavOverlay $isOpen={isMenuOpen} onClick={closeMenu} />
      </NavWrapper>
    </NavContainer>
  );
};

export default Navbar;