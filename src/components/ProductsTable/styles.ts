import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({theme}) => theme.dark};
  box-shadow: ${({theme}) => theme.boxShadow};
  padding: 1rem;
  border-radius: 1rem;
  min-height: 100%;

  .navigation {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .page-item {
    margin-top: 1rem;
    border: 1px solid ${({theme}) => theme.gray};
    list-style: none;
    cursor: pointer;
    transition: all .3s ease;

    & > a {
      display: block;
      padding: .5rem 1rem;
    }
    
    &:hover {
      color: ${({theme}) => theme.primary};
    }
  }

  .selected {
    color: ${({theme}) => theme.primary};
  }
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;