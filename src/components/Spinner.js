import React from 'react';
import styled from 'styled-components';
import { FaSpinner } from 'react-icons/fa';
import { rotate } from '../styles/animations';

const Spinner = () => {
  return <StyledSpinner></StyledSpinner>;
};

const StyledSpinner = styled(FaSpinner)`
  animation: ${rotate} 0.8s linear infinite;
`;

export default Spinner;
