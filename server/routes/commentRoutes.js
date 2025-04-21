const express = require('express');
const router = express.Router();
const {addComment,replyToComment,findComments} = require('../controllers/CommentController');
const ensureAuthenticated = require('../middleware/Auth');

router.post('/:commentId/replies', ensureAuthenticated,replyToComment);
router.post('/:reportId/comments', ensureAuthenticated, addComment);
router.get('/:reportId/comments', ensureAuthenticated, findComments);
module.exports = router;