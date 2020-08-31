import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import Flex from '../Flex';

const NavLink = ({ to, exact, children, icon }) => {
  return (
    <StyledLink to={to} exact={exact}>
      <Flex align="center" width="100%" height="100%">
        {icon}
        {children}
      </Flex>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.linkColor};
  text-decoration: none;
  font-size: 1rem;
  padding: 0.6rem 0;

  &.active {
    font-weight: 600;
    color: ${(props) => props.theme.linkColor__active};
  }

  svg {
    width: 1.2rem;
    margin-right: 0.5rem;
  }
`;

export default NavLink;
