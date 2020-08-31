const { Router } = require('express');

const auditLogsController = require('../controllers/auditLogController');

const router = Router();

router.get('/:permissionId', async (req, res) => {
  const permissionId = req.params.permissionId;

  const logs = await auditLogsController.getAuditLogs(permissionId);

  res.status(200).json(logs);
});

router.post('/', async (req, res) => {});

module.exports = router;
