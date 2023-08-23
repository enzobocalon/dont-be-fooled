import { styled } from 'styled-components';

export const Container = styled.div`
  background-color: ${({theme}) => theme.dark};
  box-shadow: ${({theme}) => theme.boxShadow};
  padding: 1rem;
  border-radius: 1rem;
  min-height: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Options = styled.div`
  cursor: pointer;
  transition: all .3s ease;
  will-change: color;

  &:hover {
    color: ${({theme}) => theme.primary};
  }
`;

export const MainContent = styled.div`
  margin-block: 1rem;

  img {
    display: block;
    width: 100%;
    margin: 0 auto;
    max-width: 200px;
    aspect-ratio: 1/1;
    object-fit: cover;
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block: .5rem;

  &:first-of-type {
    border-top: 1px solid ${({theme}) => theme.gray};
    padding-top: 1rem;
  }

  > strong {
    font-family: 'Bai Jamjuree', sans-serif;
  }
`;