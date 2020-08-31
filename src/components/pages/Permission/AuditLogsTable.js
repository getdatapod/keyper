import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Modal from '../../Modal/Modal';
import { slideDown } from '../../../styles/animations';

const AuditLogsTable = ({ auditLogs, setAuditLogs }) => {
  const closeModal = () => {
    setAuditLogs(null);
  };

  return (
    <Modal onClose={closeModal}>
      <StyledTable onClick={(e) => e.stopPropagation()}>
        <div style={{ overflowY: 'scroll', maxHeight: '80vh' }}>
          <thead>
            <tr>
              <th>Event number</th>
              <th>Request Type</th>
              <th>Request Endpoint</th>
              <th>Request Date</th>
              <th>Request Fulfilled</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs?.map((auditLog, i) => {
              return (
                <tr key={auditLog._id}>
                  <td>{i + 1}</td>
                  <td>{auditLog.method.toUpperCase()}</td>
                  <td>{auditLog.endpoint}</td>
                  <td>{moment(auditLog.requestTimestamp).format('lll')}</td>
                  <td>{auditLog.validation ? 'Success' : 'Failed'}</td>
                </tr>
              );
            })}
          </tbody>
        </div>
      </StyledTable>
    </Modal>
  );
};

const StyledTable = styled.table`
  border-collapse: collapse;
  animation: ${slideDown} 0.3s ease-in-out 0s 1;

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
    padding: 0.6rem 1rem;
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

export default AuditLogsTable;
