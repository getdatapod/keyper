const { Provider } = require('../db/db');

const getProvider = async (query) => {
  // Sorting providers in increasing order of "order"
  return await Provider.find(query).sort({ order: 1 });
};

const getAProvider = async (providerId) => {
  return await Provider.findOne({ _id: providerId });
};

const addProvider = async ({ url, name }) => {
  // Counting documents to store order in which providers are added
  const count = await Provider.count();

  return await Provider.insert({ url, name, order: count });
};

module.exports = { getProvider, addProvider, getAProvider };
