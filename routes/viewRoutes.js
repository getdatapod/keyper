const { Router } = require('express');
const axios = require('axios');

const keysController = require('../controllers/keyController');
const providerController = require('../controllers/providerController');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { providerName, domain, manifestUri } = req.query;

    // Checking if manifest.json is hosted at the same domain as the app
    if (!manifestUri.includes(domain)) {
      return res.sendStatus(400);
    }

    // Fetching manifest.json file from the app server
    const { data: manifest } = await axios.get(manifestUri);

    // Getting provider object from db
    const provider = await providerController.getProvider({
      name: providerName,
    });

    // Fetching all the keys registered for the requested provider
    const keys = await keysController.getAllKeys({
      providerId: provider[0]._id,
    });

    // Rendering consent screen with required data
    res.status(200).render('base', {
      provider: provider[0],
      manifest,
      domain,
      keys,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;
