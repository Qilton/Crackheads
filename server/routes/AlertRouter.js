const express = require('express');
const router = express.Router();
const { getAlerts } = require('../controllers/AlertController');
const ensureAuthenticated = require('../middleware/Auth');

router.get('/', ensureAuthenticated, getAlerts);

module.exports = router;