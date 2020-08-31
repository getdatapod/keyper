import React from 'react';
import styled from 'styled-components';

import Modal from '../Modal/Modal';
import Flex from '../Flex';
import { FaTimes } from 'react-icons/fa';
import { slideDown } from '../../styles/animations';

const DialogBox = ({ setOpen, actionName, onSuccess, body, title }) => {
  const closeModal = () => {
    setOpen(null);
  };

  return (
    <Modal onClose={closeModal} position="flex-start">
      <Container column onClick={(e) => e.stopPropagation()}>
        <Header justify="space-between" align="center">
          <h1>{title}</h1>
          <CloseButton onClick={closeModal} />
        </Header>
        <Body>{body}</Body>
        <ActionContainer justify="flex-end">
          <Button onClick={onSuccess} type="danger">
            {actionName}
          </Button>
          <Button onClick={closeModal}>Cancel</Button>
        </ActionContainer>
      </Container>
    </Modal>
  );
};

export default DialogBox;

const Container = styled(Flex)`
  min-width: 30rem;
  margin-top: 1rem;
  padding: 0 0.6rem;
  background-color: #fff;
  border-radius: 4px;
  animation: ${slideDown} 0.3s ease-in-out 0s 1;
`;

const Header = styled(Flex)`
  padding: 0.6rem 0.4rem;
  color: ${(props) => props.theme.grey500};
  border-bottom: 1px solid #ccc;

  h1 {
    font-size: 1.5rem;
  }
`;

const CloseButton = styled(FaTimes)`
  cursor: pointer;
`;

const Button = styled.button`
  padding: 0.5rem 0.8rem;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: ${(props) =>
    props.type === 'danger' ? props.theme.danger : props.theme.grey500};
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 0.6rem;
  }
`;

const Body = styled(Flex)`
  min-height: 6rem;
  padding: 0.6rem 0.4rem;
  color: ${(props) => props.theme.grey500};
  border-bottom: 1px solid #ccc;
`;

const ActionContainer = styled(Flex)`
  padding: 0.6rem 0.4rem;
`;
