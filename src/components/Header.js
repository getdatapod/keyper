import React from 'react';
import styled from 'styled-components';
import Flex from './Flex';

const Header = ({ icon, subheading, children }) => {
  return (
    <Container column>
      <Flex align="center" style={{ paddingBottom: '1rem' }}>
        {icon}
        <StyledH1>{children}</StyledH1>
      </Flex>
      <Subheading>{subheading}</Subheading>
    </Container>
  );
};

const Container = styled(Flex)`
  /* border-bottom: 1px solid #555; */

  svg {
    height: 2.5rem;
    margin-right: 0.8rem;
  }
`;

const StyledH1 = styled.h1`
  font-size: 1.8rem;
  text-transform: capitalize;
  color: ${(props) => props.theme.headerColor};
`;

export const Subheading = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.grey500};
`;

export default Header;
