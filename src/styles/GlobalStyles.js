import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    /* Main colors */
    --primary-color: #3f51b5;
    --primary-light: #e8eaf6;
    --primary-dark: #303f9f;
    
    --secondary-color: #f50057;
    --secondary-light: #fce4ec;
    --secondary-dark: #c51162;
    
    --success-color: #4caf50;
    --success-light: #e8f5e9;
    --success-dark: #2e7d32;
    
    --error-color: #f44336;
    --error-light: #ffebee;
    --error-dark: #c62828;
    
    --warning-color: #ff9800;
    --warning-light: #fff3e0;
    --warning-dark: #ef6c00;
    
    --info-color: #2196f3;
    --info-light: #e3f2fd;
    --info-dark: #1565c0;
    
    /* Neutrals */
    --dark-color: #333333;
    --dark-gray: #666666;
    --medium-gray: #999999;
    --light-gray: #cccccc;
    --border-color: #eeeeee;
    --light-bg: #f9f9f9;
    
    /* Misc */
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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    color: var(--dark-color);
    line-height: 1.5;
    background-color: var(--light-bg);
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
    font-weight: 600;
    line-height: 1.2;
  }
  
  h1 {
    font-size: 2.25rem;
  }
  
  h2 {
    font-size: 1.8rem;
  }
  
  h3 {
    font-size: 1.5rem;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  a {
    color: var(--primary-color);
    text-decoration: none;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  button, input, textarea, select {
    font-family: inherit;
  }
  
  button {
    cursor: pointer;
  }
  
  /* Utility classes */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  .text-center {
    text-align: center;
  }
  
  /* Animation classes */
  .fade-in {
    animation: fadeIn 0.3s ease-in;
  }
  
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: 576px) {
    html {
      font-size: 14px;
    }
    
    .container {
      padding: 0 1rem;
    }
  }
`;

export default GlobalStyles;