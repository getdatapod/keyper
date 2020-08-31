import React from 'react';
import styled from 'styled-components';

import { FaTrash } from 'react-icons/fa';
import Spinner from '../../Spinner';
import KeyPreview from './KeyPreview';

const KeysTable = ({ keys, onDeleteKey }) => {
  return (
    // <StyledTable>
    //   <thead>
    //     <tr>
    //       <th>Account</th>
    //       <th>Account Name</th>
    //       <th>Key</th>
    //       <th>Added on</th>
    //       <th>Delete</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {keys?.map((key) => {
    //       return (
    //         <tr key={key._id}>
    //           <td>
    //             <ProviderContainer>{key.provider}</ProviderContainer>
    //           </td>
    //           <td>{key.keyName}</td>
    //           <td>{key.key}</td>
    //           <td>{key.addedOn}</td>
    //           <td>
    //             <DeleteButton
    //               onClick={() => {
    //                 onDeleteKey(key._id);
    //               }}
    //             />
    //             {/* <Spinner /> */}
    //           </td>
    //         </tr>
    //       );
    //     })}
    //   </tbody>
    // </StyledTable>
    <React.Fragment>
      {keys?.map((key) => {
        return (
          <KeyPreview
            token={key.key}
            providerAssets={key.provider}
            accountName={key.keyName}
            createdOn={key.addedOn}
            onDeleteKey={() =>
              onDeleteKey({ keyId: key._id, title: key.provider.title })
            }
          ></KeyPreview>
        );
      })}
    </React.Fragment>
  );
};

const DeleteButton = styled(FaTrash)`
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
    padding: 0.8rem 2.8rem;
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

export default KeysTable;
