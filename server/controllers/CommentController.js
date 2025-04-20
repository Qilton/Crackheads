const Comment = require('../models/Comment');
const Report = require('../models/Report');

const  addComment = async (req, res) => {
    const comment = await Comment.create({ ...req.body, createdBy: req.user.id });
    await Report.findByIdAndUpdate(req.params.reportId, { $push: { comments: comment._id } });
    res.status(201).json({ comment });
  };

  const replyToComment = async (req, res) => {
    const reply = await Comment.create({ ...req.body, createdBy: req.user.id });
    await Comment.findByIdAndUpdate(req.params.commentId, { $push: { replies: reply._id } });
    res.status(201).json({ reply });
  };