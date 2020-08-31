const { App } = require('../db/db');

const getAllApps = async () => {
  return await App.find();
};

const getApp = async (appId) => {
  return await App.findOne({ _id: appId });
};

const addApp = async (metadata) => {
  let newApp = {
    metadata,
  };

  return await App.insert(newApp);
};

module.exports = { getAllApps, getApp, addApp };
