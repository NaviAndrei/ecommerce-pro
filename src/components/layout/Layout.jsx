import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';

const Main = styled.main`
  min-height: calc(100vh - 140px); /* Adjust based on header and footer height */
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1rem;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Main>
        <Container>
          {children}
        </Container>
      </Main>
      <Footer />
    </>
  );
};

export default Layout;