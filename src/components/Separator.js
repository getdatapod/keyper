import styled from 'styled-components';

const Separator = styled.span`
  height: 1px;
  background-color: ${(props) => props.theme.separatorColor};
  width: 100%;
  margin: 0.4rem 0;
`;

export default Separator;
