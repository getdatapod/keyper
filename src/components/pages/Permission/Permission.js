import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Switch, Route, useHistory } from 'react-router-dom';
import axios from 'axios';

import Header, { Subheading } from '../../Header';
import App from './App';
import PermissionsTable from './PermissionsTable';
import { fadeIn } from '../../../styles/animations';
import { ReactComponent as PermissionIcon } from '../../../assets/icons/permission.svg';

import { revokePermission, fetchAuditLogs } from './services';
import AuditLogsTable from './AuditLogsTable';
import DialogBox from '../../DialogBox/DialogBox';
import Flex from '../../Flex';

const Permission = (props) => {
  const history = useHistory();
  const [permissions, setPermissions] = useState();
  const [auditLogs, setAuditLogs] = useState();
  const [loading, setLoading] = useState(false);
  const [disconnectPermission, setDisconnectPermission] = useState();

  useEffect(() => {
    const fetchPermissions = async () => {
      let { data: fetchedPermisions } = await axios.get(
        'http://localhost:4242/api/permissions'
      );

      setPermissions(fetchedPermisions);
    };

    fetchPermissions();
  }, [loading]);

  return (
    <React.Fragment>
      <Header
        icon={<PermissionIcon />}
        subheading="Review the apps connected to your data accounts. Click on Audit Logs to see app activity."
      >
        Connected Apps
      </Header>
      <Container>
        <PermissionsTable
          permissions={permissions}
          onRevokePermission={async (permission) => {
            setDisconnectPermission(permission);
          }}
          onAuditLogs={async (_id) => {
            const logs = await fetchAuditLogs(_id);
            setAuditLogs(logs);
          }}
        />
        {auditLogs && (
          <AuditLogsTable auditLogs={auditLogs} setAuditLogs={setAuditLogs} />
        )}

        {disconnectPermission && (
          <DialogBox
            title="Are you sure ?"
            setOpen={setDisconnectPermission}
            body={
              <Body column>
                <p>
                  {disconnectPermission.app} will no longer be able to access
                  your {disconnectPermission.provider} data!
                </p>
              </Body>
            }
            actionName="Disconnect"
            onSuccess={async () => {
              setLoading(true);
              await revokePermission(disconnectPermission.permissionId);
              setLoading(false);
              setDisconnectPermission(null);
            }}
          />
        )}
      </Container>

      <Switch>
        <Route path="/permission/:appId" component={App} />
      </Switch>
    </React.Fragment>
  );
};

export default Permission;

const Container = styled.div`
  width: 100%;
  padding: 2rem 0;
  animation: ${fadeIn} 0.3s ease-in-out 1;
`;

const Body = styled(Flex)`
  p {
    font-weight: 600;
  }
  ul {
    list-style: none;
  }
`;
