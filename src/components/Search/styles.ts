import styled from 'styled-components';

export const SearchContainer = styled.div`
  position: relative;
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: ${({theme}) => theme.boxShadow};
  padding: .5rem 1rem;
  border-radius: .5rem;

  input {
    font-size: 1rem;
    height: 2rem;
    background-color: transparent;
    border: none;
    outline: none;
    color: white;
  }
`;

export const SearchItemsContainer = styled.div`
  position: absolute;
  left: 0;
  top: 3.5rem;
  width: 100%;
  z-index: 100;
  overflow-y: auto;
  background-color: ${({theme}) => theme.dark};
  box-shadow: ${({theme}) => theme.boxShadow};
  border-radius: .5rem;
`;

export const SearchItems = styled.div`
  &:not(:last-of-type) {
    border-bottom: 1px solid ${({theme}) => theme.gray};
  }
  padding: .5rem 1rem;
  cursor: pointer;
  transition: all .3s ease;
  outline: none;

  &:hover, &:focus {
    color: ${({theme}) => theme.primary};
  }
`;