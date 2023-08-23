import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Overlay = styled(motion.div)`
  background-color: rgba(0, 0, 0, .6);
  backdrop-filter: blur(5px);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled(motion.div)`
  background-color: ${({theme}) => theme.dark};
  padding: 1rem;
  width: 100%;
  max-width: 768px;
  border-radius: .5rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    display: block;
    cursor: pointer;
    transition: all .3s ease;

    &:hover {
      color: ${({theme}) => theme.primary};
    }
  }
`;

export const Content = styled.div``;

