import React, { useEffect } from 'react';
import styled from 'styled-components';

import Flex from '../Flex';

const Modal = ({ children, onClose, position = 'center' }) => {
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };

    document.addEventListener('keydown', close, true);

    return () => document.removeEventListener('keydown', close, true);
  }, []);

  return (
    <Container align={position} justify="center" onClick={onClose}>
      {children}
    </Container>
  );
};

export default Modal;

const Container = styled(Flex)`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2;
`;
