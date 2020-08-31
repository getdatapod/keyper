const { Router } = require('express');
const permissionController = require('../controllers/permissionController');

const router = Router();

router.get('/', async (req, res) => {
  try {
    // Get all permissions
    const permissions = await permissionController.getAllPermissions(req.query);

    res.status(200).json(permissions);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  const { keyId } = req.query;
  const { appMetadata, providerId } = req.body;

  try {
    // Check if key is present
    // Useful if user revokes token before giving permission to any app
    if (!(await permissionController.isKeyPresent(keyId))) {
      return res.status(404).json({ msg: 'No key found with given keyId' });
    }

    const oldApp = await permissionController.checkIfAlreadyPermitted(
      appMetadata.domain
    );

    if (oldApp) {
      const oldPermission = await permissionController.getPermission({
        appId: oldApp._id,
      });
      return res.status(200).json(oldPermission);
    }

    const iconExtension = appMetadata.appIcon.split('.').pop();

    // Downloading app icon and saving it to appMetadata
    const appIcon = await permissionController.downloadImage(
      appMetadata.appIcon,
      `${appMetadata.appName}.${iconExtension}`
    );
    appMetadata.appIcon = `${appMetadata.appName}.${iconExtension}`;

    // Add permission to db
    newPermission = await permissionController.addPermission(
      keyId,
      appMetadata,
      providerId
    );

    res.status(200).json(newPermission);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.patch('/:permissionId', async (req, res) => {
  const permissionId = req.params.permissionId;

  // Revoking permission by permissionId
  const revokedCount = await permissionController.revokePermission(
    permissionId
  );

  // If no document is modified
  if (!revokedCount) {
    return res.status(404).json('No permission found');
  }

  res.status(200).json(permissionId);
});

module.exports = router;
