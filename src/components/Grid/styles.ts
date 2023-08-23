import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 1rem auto;
  height: calc(100vh - 2rem - 76px);
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 2fr;
  grid-gap: 10px;
  height: 100%;
`;

