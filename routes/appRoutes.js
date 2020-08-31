const { Router } = require('express');
const appController = require('../controllers/appController');

const router = Router();

router.get('/', async (req, res) => {
  try {
    // Get all apps
    const allApps = await appController.getAllApps();

    res.status(200).json(allApps);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get('/:appId', async (req, res) => {
  try {
    // Get app using appId
    const app = await appController.getApp(req.params.appId);

    res.status(200).json(app);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  try {
    // Adding new app using app metadata
    const { metadata } = req.body;

    const newApp = await appController.addApp(metadata);

    res.status(200).json(newApp);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
