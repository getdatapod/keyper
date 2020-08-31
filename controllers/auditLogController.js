const { AuditLog } = require('../db/db');

const addNewAuditLog = ({
  permissionId,
  timestamp,
  method,
  endpoint,
  validation,
}) => {
  let newAuditLog = {
    permissionId,
    requestTimestamp: timestamp,
    method,
    endpoint,
    validation,
  };

  newAuditLog = AuditLog.insert(newAuditLog);
};

const getAuditLogs = async (permissionId) => {
  return await AuditLog.find({ permissionId }).sort({ requestTimestamp: -1 });
};

module.exports = { addNewAuditLog, getAuditLogs };
