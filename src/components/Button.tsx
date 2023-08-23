import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${({theme}) => theme.primary};
  font-family: 'Roboto', sans-serif;
  border: none;
  outline: none;
  color: white;
  font-size: 1rem;
  padding: .5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  transition: all .3s ease;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;

  &:hover {
    background-color: ${({theme}) => theme.primaryHover};
  }

  &:disabled {
    background-color: #a8a8a8;
    cursor: not-allowed;
  }
`;