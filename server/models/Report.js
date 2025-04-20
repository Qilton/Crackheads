// models/Report.js
import mongoose from 'mongoose';
import commentSchema from './Comment.js'; 
const reportSchema = new mongoose.Schema({
  communityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

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
  comments: [commentSchema],

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Report', reportSchema);
