import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --toastify-color-success: ${({theme}) => theme.success};
    --toastify-color-error: ${({theme}) => theme.error};
    --toastify-color-dark: ${({theme}) => theme.gray};
    --toastify-color-light: var(--toastify-color-dark);
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  html, body {
    min-height: 100vh;
    width: 100%;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    background-color: ${({theme}) => theme.dark};
    color: white;
    position: relative;
  }

`;