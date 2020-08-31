import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { getProviderAssets } from '../Keys/services';

import { FaMinusCircle, FaClipboardList } from 'react-icons/fa';
import PermissionPreview from './PermissionPreview';

const PermissionsTable = ({ permissions, onRevokePermission, onAuditLogs }) => {
  return (
    // <StyledTable>
    //   <thead>
    //     <tr>
    //       <th>App</th>
    //       <th>Account</th>
    //       <th>Created On</th>
    //       <th>Audit Logs</th>
    //       <th>Revoke</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {permissions?.map((permission) => {
    //       return (
    //         <tr key={permission._id}>
    //           <td>
    //             <AppContainer>
    //               <img
    //                 src={`http://localhost:4242/images/${permission.app.appIcon}`}
    //                 alt={permission.app.appName}
    //               />
    //               {permission.app.appName}
    //             </AppContainer>
    //           </td>
    //           <td>
    //             <ProviderContainer>
    //               {getProvider(permission.provider)}
    //             </ProviderContainer>
    //           </td>
    //           <td>{moment(permission.createdAt).format('ll')}</td>
    //           <td>
    //             <LogsButton onClick={() => onAuditLogs(permission._id)} />
    //           </td>
    //           <td>
    //             <RevokeButton
    //               onClick={() => onRevokePermission(permission._id)}
    //             />
    //           </td>
    //         </tr>
    //       );
    //     })}
    //   </tbody>
    // </StyledTable>

    <React.Fragment>
      {permissions?.map((permission) => {
        const appAssets = {
          title: permission.app.appName,
          icon: <img src={`http://localhost:4242/${permission.app.appIcon}`} />,
        };

        return (
          <PermissionPreview
            appAssets={appAssets}
            providerAssets={getProviderAssets(permission.provider)}
            createdAt={moment(permission.createdAt).format('ll')}
            onAuditLogs={() => onAuditLogs(permission._id)}
            onRevoke={() =>
              onRevokePermission({
                permissionId: permission._id,
                app: permission.app.appName,
                provider: getProviderAssets(permission.provider).title,
              })
            }
          ></PermissionPreview>
        );
      })}
    </React.Fragment>
  );
};

const LogsButton = styled(FaClipboardList)`
  padding: 0.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.grey300};
  }
`;

const RevokeButton = styled(FaMinusCircle)`
  padding: 0.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.grey300};
  }
`;

const StyledTable = styled.table`
  border-collapse: collapse;

  thead {
    background-color: ${(props) => props.theme.tableHeadColor};
  }

  tbody {
    tr {
      background-color: #fff;

      &:nth-child(even) {
        background-color: #f3f3f3;
      }
    }
  }

  th,
  td {
    text-align: left;
    padding: 0.6rem 2.8rem;
    text-transform: capitalize;
  }

  th {
    font-size: 1.1rem;
    color: #fff;
  }

  td {
    font-size: 1rem;
    font-weight: 500;
    color: #5b5b5e;
  }
`;

const ProviderContainer = styled.span`
  display: flex;
  align-items: center;

  img {
    height: 0.9rem;
    margin-right: 0.5rem;
  }
`;

const AppContainer = styled.span`
  display: flex;
  align-items: center;

  img {
    height: 0.9rem;
    margin-right: 0.5rem;
  }
`;

export default PermissionsTable;
