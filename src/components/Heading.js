import styled from 'styled-components';

const Heading = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${(props) => props.theme.headingColor};
`;

export default Heading;
