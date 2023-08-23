import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background-color: ${({theme}) => theme.primary};
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  cursor: pointer;
  transition: width .3s ease, background-color .3s ease, border-radius .2s ease;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  span {
    opacity: 0;
    transition: all .3s ease;
    max-width: 0;
  }
  
  &:hover {
    width: 100px;
    background-color: ${({theme}) => theme.primaryHover};
    border-radius: 4px;
    span {
      margin-left: .25rem;
      opacity: 1;
      max-width: 100%;
    }
  }
`;