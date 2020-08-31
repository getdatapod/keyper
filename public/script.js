const sureButton = document.getElementById('sure');
const keysSelect = document.getElementById('keys');

sureButton.addEventListener('click', async (e) => {
  const keyId = keysSelect.value;
  const appMetadata = { appName, appIcon, domain };

  // Fetching keys to show all the key options for the given provider
  const res = await axios.post(
    `http://localhost:4242/api/permissions?keyId=${keyId}`,
    { appMetadata, providerId }
  );

  const token = res?.data?.token;

  // Sending the authorization token to the callback URI using query params
  window.location = `${callbackUri}?token=${token}`;
});
