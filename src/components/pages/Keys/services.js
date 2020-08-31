import React from 'react';
import moment from 'moment';
import axios from 'axios';

import Popup from './Popup';

import GithubIcon from '../../../assets/icons/github.svg';
import FigmaIcon from '../../../assets/icons/figma.svg';
import CustomIcon from '../../../assets/icons/custom.svg';

const GITHUB = 'github';
const FIGMA = 'figma';
const CUSTOM = 'custom';

export const getPopup = (currentProvider, setCurrentProvider) => {
  switch (currentProvider.name) {
    case GITHUB:
      return (
        <Popup
          initialUrl={currentProvider.url}
          provider={getProvider(currentProvider.name)}
          setCurrentProvider={setCurrentProvider}
          providerDetails={currentProvider}
          name="GitHub"
        />
      );

    case FIGMA:
      return (
        <Popup
          initialUrl={currentProvider.url}
          provider={getProvider(currentProvider.name)}
          setCurrentProvider={setCurrentProvider}
          providerDetails={currentProvider}
          name="Figma"
        />
      );

    case CUSTOM:
      return (
        <Popup
          initialUrl=""
          provider={getProvider(currentProvider.name)}
          setCurrentProvider={setCurrentProvider}
        />
      );

    default:
      return null;
  }
};

export const getProvider = (provider) => {
  switch (provider) {
    case GITHUB:
      return (
        <React.Fragment>
          <img src={GithubIcon} alt="Github" />
          GitHub
        </React.Fragment>
      );
    case FIGMA:
      return (
        <React.Fragment>
          <img src={FigmaIcon} alt="Figma" />
          Figma
        </React.Fragment>
      );
    case CUSTOM:
      return (
        <React.Fragment>
          <img src={CustomIcon} alt="Custom" />
          Custom
        </React.Fragment>
      );
    default:
      return null;
  }
};

export const getProviderAssets = (providerName) => {
  switch (providerName) {
    case GITHUB:
      return {
        title: 'GitHub',
        icon: <img src={GithubIcon} />,
      };

    case FIGMA:
      return {
        title: 'Figma',
        icon: <img src={FigmaIcon} />,
      };

    default:
      return null;
  }
};

export const getHowToLink = (provider) => {
  switch (provider?.name) {
    case FIGMA:
      return 'https://www.figma.com/settings';
    case GITHUB:
      return 'https://github.com/settings/tokens';
    default:
      return null;
  }
};

export const parseKeys = (keys) => {
  let parsedKeys = [];
  parsedKeys = keys.map((eachKey) => {
    const _id = eachKey._id;
    const provider = getProviderAssets(eachKey.providerName);
    const keyName = eachKey.profile.userName;
    const key = eachKey.secrets.personalToken;
    const addedOn = moment(eachKey.createdAt).format('ll');
    return { _id, provider, keyName, key, addedOn };
  });

  return parsedKeys;
};

export const addNewKey = async (provider, key) => {
  try {
    const res = await axios.post('http://localhost:4242/api/keys', {
      provider,
      key,
    });

    return res;
  } catch (error) {}
};

export const deleteKey = async (keyId) => {
  try {
    const res = await axios.delete(`http://localhost:4242/api/keys/${keyId}`);
  } catch (error) {}
};
