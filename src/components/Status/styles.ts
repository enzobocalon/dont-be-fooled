import styled from 'styled-components';

interface Props {
  progress: number
  status: 'COMPLETED' | 'ON GOING' | 'STARTING' | null
}

export const Container = styled.div`
  background-color: ${({theme}) => theme.dark};
  box-shadow: ${({theme}) => theme.boxShadow};
  padding: 1rem;
  border-radius: 1rem;
  min-height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  

  > p {
    text-align: center;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    cursor: pointer;
    color: ${({theme}) => theme.info};
    transition: all .3s ease;

    &:hover {
      color: ${({theme}) => theme.lighterInfo}
    }
  }
`;

export const Content = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  p {
    margin-top: 1.5rem;

    strong {
      font-family: 'Bai Jamjuree', sans-serif;
    }
  }

  &::before {
    content: '${({progress, status}) => status === 'STARTING' && progress === 0 ? 'Starting...' : `${progress}%`}';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.1rem;
    text-transform: uppercase;
    font-family: 'Bai Jamjuree', sans-serif;
  }

  svg {
    transform: rotate(-90deg);
    #progress {
      stroke: ${({theme, progress}) => progress === 100 ? theme.success : theme.primary};
      transition: all .3s ease;
    }
  }

  text {
    transform: rotate(90deg);
    fill: ${({theme}) => theme.primary};
  }
`;