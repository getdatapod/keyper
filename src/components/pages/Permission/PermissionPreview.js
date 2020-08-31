import React from 'react';
import styled from 'styled-components';
import DocumentPreview from '../../DocumentPreview/DocumentPreview';

const PermissionPreview = ({
  appAssets,
  providerAssets,
  onAuditLogs,
  onRevoke,
  createdAt,
}) => {
  return (
    <DocumentPreview
      title={appAssets.title}
      images={appAssets.icon}
      content={
        <Content>
          <p>
            Connected to <span>{providerAssets.title}</span>
          </p>
          <p>
            Connection established on <span>{createdAt}</span>
          </p>
        </Content>
      }
      actions={
        <ActionsContainer>
          <AuditLogsButton onClick={onAuditLogs}>Audit Logs</AuditLogsButton>
          <RevokeButton onClick={onRevoke}>Disconnect</RevokeButton>
        </ActionsContainer>
      }
    ></DocumentPreview>
  );
};

export default PermissionPreview;

const Content = styled.div`
  p {
    font-weight: 300;
    span {
      font-weight: 500;
    }
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const AuditLogsButton = styled.button`
  height: fit-content;
  padding: 0.4rem 0.6rem;
  background: none;
  outline: none;
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 2px;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${(props) => props.theme.primary};
  cursor: pointer;
`;

const RevokeButton = styled.button`
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
