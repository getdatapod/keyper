import React from 'react';
import styled from 'styled-components';
import Flex from '../../Flex';

const Provider = ({ children, onClick, icon }) => {
  return (
    <Container align="center" justify="center" onClick={onClick}>
      {icon}
      {children}
    </Container>
  );
};

export default Provider;

const Container = styled(Flex)`
  min-width: 8rem;
  padding: 0.3rem 2rem;
  border: 1px solid #919191;
  background-color: #fff;
  border-radius: 6px;
  font-size: 1.2rem;
  color: #707070;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 5rem;
  }

  img {
    height: 1.2rem;
    margin-right: 0.5rem;
  }
`;
