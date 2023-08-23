import styled from 'styled-components';

const RESPONSIVE = '600px';

export const Container = styled.div`
  max-height: calc(350px - 1rem);
  overflow-y: auto;
  margin-top: 1rem;

  scrollbar-width: auto;
  scrollbar-color: ${({theme}) => theme.primary} ${({theme}) => theme.dark};
  
  /* Chrome, Edge, and Safari */
  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-track {
    background: ${({theme}) => theme.dark};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({theme}) => theme.primary};
    border-radius: 10px;
    border: 3px solid ${({theme}) => theme.dark};
  }
`;

export const Table = styled.table`
  border: 1px solid ${({theme}) => theme.gray};
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  color: black;
  table-layout: fixed;

  caption {
    font-size: 1.5em;
    margin: .5em 0 .75em;
  }

  @media (max-width: ${RESPONSIVE}) {
    border: 0;

    caption {
      font-size: 1.3em;
    }
  }
`;

export const TableHeader = styled.thead`
  color: white;
  @media (max-width: ${RESPONSIVE}) {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    width: 1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }
`;

export const TableTH = styled.th`
  padding: .625em;
  text-align: center;
  font-size: .85em;
  letter-spacing: .1em;
  text-transform: uppercase;

`;

export const TableRow = styled.tr`
  background-color: ${({theme}) => theme.dark};
  border: 1px solid ${({theme}) => theme.gray};
  padding: .35em;
  color: white;

  @media (max-width: ${RESPONSIVE}) {
    border-bottom: 3px solid ${({theme}) => theme.gray};
    display: block;
    margin-bottom: .625em;
  }
`;

export const TableData = styled.td`
  padding: .625em;
  text-align: center;

  &[data-label='Source'] {
    overflow: hidden;
    
    span {
      cursor: pointer;
      transition: all .3s ease;

      &:hover {
        color: ${({theme}) =>  theme.primary};
      }
    }
  }

  @media (max-width: ${RESPONSIVE}) {
    border-bottom: 1px solid ${({theme}) => theme.gray};
    display: block;
    font-size: .8em;
    text-align: right;

    &::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }

    &:last-child {
      border-bottom: 0;
    }
  }
`;

export const TableBody = styled.tbody``;