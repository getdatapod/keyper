import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { getPopup, getProvider, parseKeys, deleteKey } from './services';

import Header from '../../Header';
import Popup from './Popup';
import Heading from '../../Heading';
import Provider from './Provider';
import Flex from '../../Flex';
import KeysTable from './KeysTable';
import DialogBox from '../../DialogBox/DialogBox';

import { ReactComponent as KeysIcon } from '../../../assets/icons/keys.svg';
import { fadeIn } from '../../../styles/animations';

const Keys = () => {
  const [currentProvider, setCurrentProvider] = useState({ url: '', name: '' });
  const [providers, setProviders] = useState();
  const [keys, setKeys] = useState();
  const [loading, setLoading] = useState(false);
  const [deletedKey, setDeletedKey] = useState();
  const [permissions, setPermissions] = useState();

  useEffect(() => {
    const fetchProviders = async () => {
      const { data: fetchedProviders } = await axios.get(
        'http://localhost:4242/api/providers'
      );
      setProviders(fetchedProviders);
    };

    fetchProviders();
  }, []);

  useEffect(() => {
    const fetchKeys = async () => {
      let { data: fetchedKeys } = await axios.get(
        'http://localhost:4242/api/keys'
      );
      const parsedKeys = parseKeys(fetchedKeys);
      setKeys(parsedKeys);
    };

    fetchKeys();
  }, [currentProvider, loading]);

  useEffect(() => {
    const fetchPermissions = async () => {
      const { data: fetchedPermissions } = await axios.get(
        `http://localhost:4242/api/permissions/?keyId=${deletedKey?.keyId}`
      );
      setPermissions(fetchedPermissions);
    };

    fetchPermissions();
  }, [deletedKey]);

  return (
    <React.Fragment>
      <Header
        icon={<KeysIcon />}
        subheading={
          <span>Add, remove or review the keys to your data accounts</span>
        }
      >
        Your keys
      </Header>
      <Container>
        <Heading>Add New Keys</Heading>
        <ProviderContainer width="100%">
          {providers?.map((provider) => {
            return (
              <Provider
                key={provider._id}
                onClick={() => setCurrentProvider(provider)}
              >
                {getProvider(provider.name)}
              </Provider>
            );
          })}

          <Provider
            onClick={() =>
              setCurrentProvider({ url: '', name: 'custom', _id: '-1' })
            }
          >
            {getProvider('custom')}
          </Provider>
        </ProviderContainer>

        {getPopup(currentProvider, setCurrentProvider)}

        <KeysTable
          keys={keys}
          onDeleteKey={async (key) => {
            setDeletedKey(key);
          }}
        />

        {deletedKey && (
          <DialogBox
            title="Are you sure ?"
            setOpen={setDeletedKey}
            body={
              <Body column>
                <p>
                  These apps will no longer have access to your{' '}
                  {deletedKey.title} data
                </p>
                <ul>
                  {permissions &&
                    permissions.map((permission) => (
                      <li key={permission._id}>- {permission.app.appName}</li>
                    ))}
                </ul>
              </Body>
            }
            actionName="Delete"
            onSuccess={async () => {
              setLoading(true);
              await deleteKey(deletedKey.keyId);
              setLoading(false);
              setDeletedKey(null);
            }}
          />
        )}
      </Container>
    </React.Fragment>
  );
};

export default Keys;

const Container = styled.div`
  width: 100%;
  padding: 2rem 0;
  animation: ${fadeIn} 0.3s ease-in-out 1;
`;

const ProviderContainer = styled(Flex)`
  padding: 1.2rem 0;
  margin-bottom: 2rem;
`;

const Body = styled(Flex)`
  p {
    font-weight: 600;
  }
  ul {
    list-style: none;
  }
`;
