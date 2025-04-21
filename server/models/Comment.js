const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  report: { type: mongoose.Schema.Types.ObjectId, ref: 'Report' },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],  // Replies to this comment
  parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null }, // Link to parent comment (null if it's a top-level comment)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
