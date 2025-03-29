import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    /* Colors */
    --primary-color: #3f51b5;
    --primary-light: #757de8;
    --primary-dark: #002984;
    --secondary-color: #f50057;
    --success-color: #4caf50;
    --error-color: #f44336;
    --warning-color: #ff9800;
    --info-color: #2196f3;
    
    /* Grays */
    --text-color: #333333;
    --dark-gray: #666666;
    --medium-gray: #999999;
    --light-gray: #eeeeee;
    --background-color: #f5f5f5;
    
    /* Layout */
    --max-width: 1200px;
    --border-radius: 4px;
    --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    font-size: 16px;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--background-color);
  }
  
  a {
    color: var(--primary-color);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 1rem;
  }
  
  h1 {
    font-size: 2.5rem;
  }
  
  h2 {
    font-size: 2rem;
  }
  
  h3 {
    font-size: 1.75rem;
  }
  
  h4 {
    font-size: 1.5rem;
  }
  
  h5 {
    font-size: 1.25rem;
  }
  
  h6 {
    font-size: 1rem;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  ul, ol {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }
  
  button, input, select, textarea {
    font-family: inherit;
  }
`;

export default GlobalStyles;