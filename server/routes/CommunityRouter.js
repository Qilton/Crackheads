const {createCommunity,createCode,joinCommunity,getMembers,getCommunities}= require('../controllers/CommunityController');
const ensureAuthenticated = require('../middleware/Auth');
const router = require('express').Router();

router.post('/create', ensureAuthenticated, createCommunity);
router.post('/code', ensureAuthenticated, createCode);
router.post('/join', ensureAuthenticated, joinCommunity);
router.get('/members/:communityId', ensureAuthenticated, getMembers);
router.get('/get', ensureAuthenticated, getCommunities);
module.exports = router;