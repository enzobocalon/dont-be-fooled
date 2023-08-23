import styled from 'styled-components';
import * as Select from '@radix-ui/react-select';

export const Container = styled.div`
  width: 75%;
`;

export const Content = styled(Select.Content)`
  overflow: hidden;
  background-color: ${({theme}) => theme.dark};
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  z-index: 200;
  position: relative;
  width: 100%;
  border-radius: 4px;
  outline: none;
  border: 1px solid ${({theme}) => theme.gray};
`;

export const Trigger = styled(Select.Trigger)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 13px;
  line-height: 1;
  height: 2rem;
  gap: 5px;
  border: 1px solid ${({theme}) => theme.gray};
  cursor: pointer;
  background-color: transparent;
  color: white;
  outline: none;
`;

export const Item = styled(Select.Item)`
  font-size: 13px;
  color: white;
  border-radius: 3px;
  display: flex;
  align-items: center;
  gap: .5rem;
  position: relative;
  width: var(--radix-select-trigger-width);
  max-height: var(--radix-select-content-available-height);
  outline: none;
  cursor: pointer;
  transition: all .3s ease;
  padding-left: 1rem;
  border-bottom: 1px solid ${({theme}) => theme.gray};
  padding-block: .5rem;

  &:hover {
    color: ${({theme}) => theme.primaryHover};
  }

  &:last-of-type {
    border-bottom: none;
  }
`;