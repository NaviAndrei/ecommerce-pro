import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.main`
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
`;

const Layout = () => {
  return (
    <MainContainer>
      <Navbar />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
      <Footer />
    </MainContainer>
  );
};

export default Layout;
