import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: .5rem;
  border-top: 2px solid ${({ theme }) => theme.gray};
`;

export const Sidebar = styled.aside`
  flex: 1;
  margin-top: .5rem;
  border-right: 2px solid ${({ theme }) => theme.gray};
`;

export const SidebarCategory = styled.div`

`;

export const SidebarItems = styled.div`
  margin-block: 1rem;
  cursor: pointer;
  width: fit-content;

  transition: all .3s ease;

  &:hover {
    color: ${({theme}) => theme.primary};
  }
`;

export const Main = styled.main`
  flex: 5;
  margin-top: .5rem;
`;