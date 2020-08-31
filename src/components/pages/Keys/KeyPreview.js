import React, { Fragment } from 'react';
import styled from 'styled-components';
import DocumentPreview from '../../DocumentPreview/DocumentPreview';

import GitHubIcon from '../../../assets/icons/github.svg';

const KeyPreview = ({
  token,
  providerAssets,
  accountName,
  createdOn,
  onDeleteKey,
}) => {
  return (
    <DocumentPreview
      title={`${providerAssets.title} (${token})`}
      images={providerAssets.icon}
      content={
        <Content>
          <p>
            Belongs to <span>{accountName}</span>
          </p>
          <p>
            Key added on <span>{createdOn}</span>
          </p>
        </Content>
      }
      actions={
        <Fragment>
          <DeleteButton onClick={onDeleteKey}>Delete</DeleteButton>
        </Fragment>
      }
    ></DocumentPreview>
  );
};

export default KeyPreview;

const Content = styled.div`
  p {
    font-weight: 300;
    span {
      font-weight: 500;
    }
  }
`;

const DeleteButton = styled.button`
  height: fit-content;
  align-self: center;
  background: none;
  border: none;
  outline: none;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${(props) => props.theme.danger};
  cursor: pointer;
`;
