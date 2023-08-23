import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const StyledToastContainer = styled(ToastContainer)`

  .Toastify__toast {
    background-color: var(--toastify-color-dark);
    color: white;
  }

  .Toastify__close-button--light {
    color: inherit;
  }
`;