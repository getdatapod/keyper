const permissionController = require('./permissionController');
const keyController = require('./keyController');

const getAccessToken = async (token) => {
  try {
    // Find the permission based on the authentication token
    const permission = await permissionController.getPermission({
      token,
      isRevoked: false,
    });

    // Return null if permission is not present
    // (No permission is granted)
    if (!permission) {
      return { accessToken: null, permissionId: null };
    }

    // Fetch the key based on the permission
    const key = await keyController.getKey(permission.keyId);

    return {
      accessToken: key.secrets.personalToken,
      permissionId: permission._id,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  getAccessToken,
};
