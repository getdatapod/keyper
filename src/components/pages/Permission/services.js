import axios from 'axios';

export const revokePermission = async (permissionId) => {
  try {
    const res = await axios.patch(
      `http://localhost:4242/api/permissions/${permissionId}`
    );
  } catch (error) {}
};

export const fetchAuditLogs = async (permissionId) => {
  try {
    const res = await axios.get(
      `http://localhost:4242/api/auditLogs/${permissionId}`
    );

    return res.data;
  } catch (error) {}
};
