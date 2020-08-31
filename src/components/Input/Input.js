import React from 'react';
import styled from 'styled-components';

const Input = (props) => {
  return (
    <StyledLabel>
      {props.label}
      <StyledInput {...props} />
    </StyledLabel>
  );
};

export default Input;

export const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
`;

const StyledInput = styled.input`
  min-width: 15rem;
  padding: 0.4rem 0.8rem;
  margin: 0.4rem 0.6rem;
  font-size: 1rem;
  border: none;
  outline: none;
  border-radius: 4px;
  background-color: ${(props) => props.theme.inputBackgroundColor};
`;
