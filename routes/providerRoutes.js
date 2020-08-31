const { Router } = require('express');
const providerController = require('../controllers/providerController');

const router = Router();

router.get('/', async (req, res) => {
  try {
    // Get provider with any query
    // e.g., query = { name: 'figma' }
    const providers = await providerController.getProvider(req.query);

    res.status(200).json(providers);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  try {
    const { url, name } = req.body;

    // Add new provider to db
    const newProvider = await providerController.addProvider({ url, name });

    res.status(200).json(newProvider);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
