import styled from 'styled-components';
import {motion} from 'framer-motion';
import { TooltipContent } from '@radix-ui/react-tooltip';

export const StyledContent = styled(TooltipContent)`
  max-width: 375px;
  background-color: ${({theme}) => theme.gray};
  color: white;
  padding: .5rem 1rem;
  line-height: 1.5rem;
  box-shadow: ${({theme}) => theme.boxShadow};
  border-radius: .5rem;
  transform: translateY(-.25rem);

  .TooltipArrow {
    fill: ${({theme}) => theme.gray};
  }
`;

export const AnimatedDiv = styled(motion.div)``;