const { app: electronApp } = require('electron');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const { Permission, Key, App } = require('../db/db');
const appController = require('./appController');
const providerController = require('./providerController');

const getAllPermissions = async (query) => {
  // Get all permissions that is not revoked
  const permissions = await Permission.find({ isRevoked: false, ...query });

  let updatedPermissions = [];

  // Populating permission object with app and provider name before sending
  for (permission of permissions) {
    const app = await appController.getApp(permission.appId);
    const provider = await providerController.getAProvider(
      permission.providerId
    );

    updatedPermissions.push({
      _id: permission._id,
      app: app.metadata,
      provider: provider.name,
      auditLogs: permission.auditLogs,
      createdAt: permission.createdAt,
    });
  }

  return updatedPermissions;
};

const getPermission = async (query) => {
  return await Permission.findOne(query);
};

const isKeyPresent = async (keyId) => {
  const key = await Key.find({ _id: keyId });

  if (key) {
    return true;
  } else return false;
};

// TODO Encode this token
// GitHub issue - https://github.com/getdatapod/bridge23-samples/issues/5
const generateToken = () => {
  // Generate token for app authentication/identification
  return '0x123';
};

const addPermission = async (keyId, appMetadata, providerId) => {
  const token = generateToken();

  // Create new app
  const newApp = await appController.addApp(appMetadata);

  let newPermission = {
    keyId,
    providerId,
    appId: newApp._id,
    token,
    auditLogs: [],
    isRevoked: false,
    revokedDate: null,
  };

  // Adding new permission to db
  newPermission = await Permission.insert(newPermission);

  return newPermission;
};

const revokePermission = async (permissionId) => {
  // Setting permission isRevoked value to true
  const res = await Permission.update(
    { _id: permissionId },
    {
      $set: {
        isRevoked: true,
      },
    }
  );

  // If no document is modified return null
  if (res === 0) {
    return null;
  }

  return res;
};

const downloadImage = async (url, imageName) => {
  const homePath = electronApp.getPath('home');
  const imagePath = path.join(homePath, '.keyper', 'images');

  const response = await axios({
    url,
    responseType: 'stream',
  });

  return new Promise((resolve, reject) => {
    // Create directory if not exist
    if (!fs.existsSync(imagePath)) {
      fs.mkdirSync(imagePath);
    }

    response.data
      .pipe(fs.createWriteStream(path.join(imagePath, imageName)))
      .on('finish', () => resolve())
      .on('error', (e) => reject(e));
  });
};

const revokePermissionByKeyId = async (keyId) => {
  // Revoking all permissions that belongs to a given keyId
  await Permission.update(
    { keyId },
    {
      $set: {
        isRevoked: true,
      },
    },
    { multi: true }
  );
};

const checkIfAlreadyPermitted = async (domain) => {
  const res = await App.findOne({ 'metadata.domain': domain });
  return res;
};

module.exports = {
  getAllPermissions,
  getPermission,
  isKeyPresent,
  generateToken,
  addPermission,
  revokePermission,
  downloadImage,
  revokePermissionByKeyId,
  checkIfAlreadyPermitted,
};
