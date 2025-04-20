const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CommentController');

router.post('/:commentId/reply', commentController.replyToComment);

module.exports = router;