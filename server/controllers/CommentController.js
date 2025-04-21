const Comment = require('../models/Comment');
const Report = require('../models/Report');
const findComments = async (req, res) => {
  try {
    // Fetch top-level comments with nested replies
    const comments = await Comment.find({ report: req.params.reportId, parentComment: null })
      .populate('createdBy', 'name pfp') // Populate user info for the comments
      .populate({
        path: 'replies',
        populate: {
          path: 'createdBy', 
          select: 'name pfp'
        },
        options: { sort: { createdAt: -1 } },
      })
      .exec();

    // Log the populated comments

    res.status(200).json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
};





const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text.trim()) {
      return res.status(400).json({ message: 'Comment text cannot be empty' });
    }

    const comment = await Comment.create({
      text,
      report: req.params.reportId,
      createdBy: req.user._id, // from middleware
      createdAt: new Date(),
    });

    await Report.findByIdAndUpdate(req.params.reportId, {
      $push: { comments: comment._id }
    });

    res.status(201).json({ comment });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Failed to add comment' });
  }
};

const replyToComment = async (req, res) => {
  try {
    const { text } = req.body;
    const parentComment = await Comment.findById(req.params.commentId);

    if (!parentComment) {
      return res.status(404).json({ message: 'Parent comment not found' });
    }

    const reply = await Comment.create({
      text,
      report: parentComment.report,
      parentComment: parentComment._id,  // Link to the parent comment
      createdBy: req.user._id,
      createdAt: new Date(),
    });

    parentComment.replies.push(reply._id);  // Add the reply to the parent's replies array
    await parentComment.save();

    res.status(201).json({ reply });
  } catch (error) {
    console.error('Error replying to comment:', error);
    res.status(500).json({ message: 'Failed to add reply' });
  }
};


module.exports = {
  addComment,
  replyToComment,
  findComments,
};
