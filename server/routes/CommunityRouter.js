const {createCommunity}= require('../controllers/CommunityController');
const ensureAuthenticated = require('../middleware/Auth');
const router = require('express').Router();

router.post('/create', ensureAuthenticated, createCommunity);


module.exports = router;