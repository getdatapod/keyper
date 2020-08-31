const { Router } = require('express');
const keyController = require('../controllers/keyController');
const providerController = require('../controllers/providerController');
const permissionController = require('../controllers/permissionController');

const router = Router();

router.get('/', async (req, res) => {
  try {
    let keys = await keyController.getAllKeys();

    let updatedKeys = [];

    // Adding providerName and encrypting API token before sending to frontend
    for (key of keys) {
      key.secrets.personalToken = keyController.encryptKey(
        key.secrets.personalToken
      );

      const providerName = await providerController.getAProvider(
        key.providerId
      );

      key = { ...key, providerName: providerName.name };

      updatedKeys.push(key);
    }

    res.status(200).json(updatedKeys);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get('/:keyId', async (req, res) => {
  try {
    let key = await keyController.getKey(req.params.keyId);

    // Encrypting API token before sending to frontend
    key.secrets.personalToken = keyController.encryptKey(
      key.secrets.personalToken
    );

    // Adding providerName
    const providerName = await providerController.getAProvider(key.providerId);

    key = { ...key, providerName: providerName.name };

    res.status(200).json(key);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  try {
    const { provider, key } = req.body;

    // Getting keyName to distinguish keys from same provider
    // e.g., For more than one github account
    const keyName = await keyController.getKeyName(provider.name, key);

    let newKey = await keyController.addKey(
      provider._id,
      { personalToken: key },
      { userName: keyName }
    );

    if (!newKey) {
      return res.status(400).json('Given token already exist');
    }

    // Encrypting API token before sending to frontend
    newKey.secrets.personalToken = keyController.encryptKey(
      newKey.secrets.personalToken
    );

    // Adding providerName
    const providerName = await providerController.getAProvider(
      newKey.providerId
    );

    newKey = { ...newKey, providerName: providerName.name };

    res.status(200).json(newKey);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete('/:keyId', async (req, res) => {
  const keyId = req.params.keyId;

  // Delete key with keyId and return the deleted keys count
  const deleteCount = await keyController.deleteKey(keyId);

  // If no key is deleted
  if (deleteCount === 0) {
    return res.status(404).json('Key not found');
  }

  // Revoke all permissins with the current keyId
  await permissionController.revokePermissionByKeyId(keyId);

  res.status(200).json({ _id: keyId });
});

module.exports = router;
