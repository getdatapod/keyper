const requestController = require('../controllers/requestController');
const auditLogController = require('../controllers/auditLogController');
const axios = require('axios');

const { Router } = require('express');

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { token, method, url, data } = req.body;

    // Getting API token and permissionId from permissions db
    const {
      accessToken,
      permissionId,
    } = await requestController.getAccessToken(token);

    // Adding failed validation log and return unauthorized response
    if (!accessToken) {
      auditLogController.addNewAuditLog({
        permissionId: null,
        timestamp: new Date(),
        method,
        endpoint: url,
        validation: false,
      });
      return res.sendStatus(401);
    }

    try {
      // Making request on behalf of the app using API token
      const response = await axios({
        method,
        url,
        data,
        headers: {
          Authorization: `token ${accessToken}`,
        },
      });

      // Adding successful validation log if request is successful
      auditLogController.addNewAuditLog({
        permissionId,
        timestamp: new Date(),
        method,
        endpoint: url,
        validation: true,
      });

      // Sending response data to the app
      res.json(response.data);
    } catch (error) {
      auditLogController.addNewAuditLog({
        permissionId,
        timestamp: new Date(),
        method,
        endpoint: url,
        validation: false,
      });
      throw error;
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
