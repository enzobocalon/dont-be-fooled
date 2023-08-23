import styled from 'styled-components';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { motion } from 'framer-motion';

export const Dropdown = styled(DropdownMenu.Content)`
  background-color: ${({theme}) => theme.gray};
  box-shadow: ${({theme}) => theme.boxShadow};
  margin-top: 1rem;
  transform: translateX(-.5rem);
  padding: .5rem 1rem;
  border-radius: .5rem;
  border-top-right-radius: 0;
  position: relative;

  ::before {
    content: '';
    width: 0;
    position: absolute;
    height: 0;
    background-color: transparent;
    right: 0;
    transform: translate(0, -50%);
    top: -2px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    
    border-bottom: 5px solid ${({theme}) => theme.gray};
  }
`;



export const AnimatedDiv = styled(motion.div)``;