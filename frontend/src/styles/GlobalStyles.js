import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    line-height: 1.5;
    color: #2D3748;
    background-color: #EDF2F7;
    min-height: 100vh;
  }
  
  a {
    text-decoration: none;
    color: #9AE6B4;
    font-weight: 500;
    
    &:hover {
      color: #68D391;
    }
  }
  
  button {
    cursor: pointer;
  }
  
  input, button, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.5rem;
    font-weight: 600;
    line-height: 1.2;
    color: #2D3748;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  
  ul, ol {
    list-style-position: inside;
    margin-bottom: 1rem;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
   
  ::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
`;

export default GlobalStyles;
