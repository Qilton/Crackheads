// models/Report.js
const mongoose = require('mongoose');
const commentSchema = require('./Comment').schema; // Assuming you have a Comment model defined in Comment.js
const reportSchema = new mongoose.Schema({
  communityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },

  heading: { type: String, required: true },
  description: { type: String, required: true },
  type: {
    type: String,
    enum: ['Electricity', 'Water', 'Security', 'Maintenance', 'Other'],
    default: 'Other'
  },

  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  flaggedCount: { type: Number, default: 0 },
  flaggedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],


  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
