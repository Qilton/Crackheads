const express = require('express');
const router = express.Router();
const {removeUserFromCommunity,changeRole} = require('../controllers/AdminController');
const ensureAuthenticated = require('../middleware/Auth');

router.post('/remove', ensureAuthenticated, removeUserFromCommunity);
router.post('/changeRole', ensureAuthenticated, changeRole);
module.exports = router;