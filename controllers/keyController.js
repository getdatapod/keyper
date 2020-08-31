const { Key, Provider } = require('../db/db');
const github = require('./github');
const figma = require('./figma');

const GITHUB = 'github';
const FIGMA = 'figma';
const STARS = '*****';

const getAllKeys = async (query) => {
  return await Key.find(query);
};

const getKey = async (keyId) => {
  return await Key.findOne({ _id: keyId });
};

const addKey = async (providerId, secrets, profile) => {
  let newKey = { providerId, secrets, profile };

  const key = await Key.findOne({
    'secrets.personalToken': secrets.personalToken,
  });

  if (key) {
    return null;
  }

  newKey = await Key.insert(newKey);

  return newKey;
};

const getKeyName = async (providerName, key) => {
  // Fetching keyname based on the provider
  switch (providerName) {
    case GITHUB: {
      return await github.getProfileName(key);
    }
    case FIGMA: {
      return await figma.getProfileName(key);
    }
  }
};

const encryptKey = (key) => {
  // Encrypting key (for sending to the frontend)
  const length = key.length;

  return STARS + key.substr(length - 4);
};

const deleteKey = async (_id) => {
  return await Key.remove({ _id });
};

module.exports = {
  getAllKeys,
  getKey,
  addKey,
  getKeyName,
  encryptKey,
  deleteKey,
};
