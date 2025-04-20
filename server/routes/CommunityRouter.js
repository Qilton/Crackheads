const {createCommunity,createCode,joinCommunity}= require('../controllers/CommunityController');
const ensureAuthenticated = require('../middleware/Auth');
const router = require('express').Router();

router.post('/create', ensureAuthenticated, createCommunity);
router.post('/code', ensureAuthenticated, createCode);
router.post('/join', ensureAuthenticated, joinCommunity);
module.exports = router;