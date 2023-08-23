import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 1rem;
  box-shadow: ${({theme}) => theme.boxShadow};

`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div`
  font-family: 'Bai Jamjuree';
  font-size: 1.1rem;
`;

export const Add = styled.div`
  background-color: ${({theme}) => theme.primary};
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background-color: ${({theme}) => theme.primaryHover};
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;