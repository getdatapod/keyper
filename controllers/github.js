const axios = require('axios');

const getProfileName = async (token) => {
  try {
    const res = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    return res.data.login;
  } catch (error) {
    throw error;
  }
};

module.exports = { getProfileName };
