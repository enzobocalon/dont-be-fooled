import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({theme}) => theme.dark};
  box-shadow: ${({theme}) => theme.boxShadow};
  padding: 1rem;
  border-radius: 1rem;
  min-height: 100%;

  & > small {
    display: block;
    text-align: center;
    color: rgba(255, 255, 255, .5);  
  }
`;

export const Header = styled.div``;