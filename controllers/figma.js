const axios = require('axios');

const getProfileName = async (token) => {
  try {
    const res = await axios.get('https://api.figma.com/v1/me', {
      headers: {
        'X-FIGMA-TOKEN': token,
      },
    });

    return res.data.email;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { getProfileName };
