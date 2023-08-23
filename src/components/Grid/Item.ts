import { styled, css } from 'styled-components';

interface Props {
  fullcolumn?: 1 | 0;
}

const GridItem = styled.div<Props>`
  ${({fullcolumn}) => fullcolumn && css`
    grid-column: 1 / span 3;
  `}
`;

export default GridItem;