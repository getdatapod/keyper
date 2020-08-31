import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { addNewKey, getHowToLink } from './services';

import Flex from '../../Flex';
import Input from '../../Input/Input';
import { StyledLabel as Label } from '../../Input/Input';
import Modal from '../../Modal/Modal';

import KeysIcon from '../../../assets/icons/keys.svg';
import { slideDown } from '../../../styles/animations';

const Popup = ({
  initialUrl,
  initialKey,
  provider,
  setCurrentProvider,
  providerDetails,
  name,
}) => {
  const [url, setUrl] = useState(initialUrl || '');
  const [key, setKey] = useState(initialKey || '');

  const closeModal = () => {
    setCurrentProvider({ url: '', name: '' });
  };

  const onAddNewKey = async () => {
    const res = await addNewKey(providerDetails, key);
    closeModal();
  };

  useEffect(() => {
    setUrl(initialUrl);
  }, [initialUrl]);

  return (
    <Modal onClose={closeModal}>
      <Container column onClick={(e) => e.stopPropagation()}>
        <Header align="center" justify="space-between">
          <span> Add a new key</span>{' '}
          <span className="close" onClick={closeModal}>
            x
          </span>
        </Header>
        <ContentContainer column>
          {provider && (
            <Label>
              Account Provider :
              <ProviderContainer align="center">{provider}</ProviderContainer>
            </Label>
          )}

          <Label>
            Provider URL : <ProviderContainer>{url}</ProviderContainer>
          </Label>

          {/* <Input
            label="Provider URL :"
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          /> */}

          <Input
            type="text"
            placeholder="Paste Your Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            label="Personal API Token :"
            autoFocus
          />

          <StyledButton onClick={onAddNewKey}>
            Add Key <img src={KeysIcon} alt="Keys" />
          </StyledButton>

          <HowToLink href={getHowToLink(providerDetails)} target="_blank">
            Click here to generate your {name} Key
          </HowToLink>
        </ContentContainer>
      </Container>
    </Modal>
  );
};

export default Popup;

const Container = styled(Flex)`
  width: 40rem;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  animation: ${slideDown} 0.3s ease-in-out 0s 1;
  z-index: 3;
`;

const ContentContainer = styled(Flex)`
  padding: 4rem 6rem;
`;

const ProviderContainer = styled(Flex)`
  min-width: 15rem;
  font-size: 1rem;
  /* padding: 0 0.4rem; */
  margin: 0.4rem 0.6rem;

  img {
    height: 1rem;
    margin-right: 0.4rem;
  }
`;

const Header = styled(Flex)`
  padding: 1.5rem 1rem;
  background-color: ${(props) => props.theme.popupHeadColor};
  color: #fff;
  height: 2rem;
  font-size: 1.2rem;
  font-weight: 600;

  .close {
    padding: 0.5rem;
    cursor: pointer;
  }
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
  align-self: center;
  padding: 0.6rem 0.8rem;
  margin: 1rem 0;
  outline: none;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  font-weight: 600;
  background-color: #ececec;
  color: #4d4d4d;
  cursor: pointer;

  img {
    height: 1.4rem;
    margin-left: 0.5rem;
  }
`;

const HowToLink = styled.a`
  margin-top: 1rem;
  align-self: center;
  color: ${(props) => props.theme.primary};
`;
