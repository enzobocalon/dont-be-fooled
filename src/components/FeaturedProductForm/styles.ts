import { styled } from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

export const FormItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-block: .5rem;
  
  &:last-of-type {
    align-self: flex-end;
  }
`;