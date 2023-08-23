import styled from 'styled-components';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export const DropdownItem = styled(DropdownMenu.Item)`
  cursor: pointer;
  user-select: none;
  outline: none;
  line-height: 1;
  border-radius: 3px;
  display: flex;
  align-items: center;
  gap: .5rem;
  height: 25px;
  margin-block: .5rem;
  font-family: 'Bai Jamjuree';
  transition: all 0.3s ease;

  &:hover {
    color : ${({theme}) => theme.primaryHover};
  }
`;