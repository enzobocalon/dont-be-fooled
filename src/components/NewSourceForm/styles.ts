import styled from 'styled-components';

export const Container = styled.div``;

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

export const Input = styled.input`
  width: 75%;
  height: 2rem;
  border-radius: 4px;
  background-color: transparent;
  border: 1px solid ${({theme}) => theme.gray};
  outline: none;
  color: white;
  font-family: 'Roboto', sans-serif;
  padding: .5rem;
`;

export const Error = styled.p`
  color: red;
`;