const Report = require('../models/Report');


const createReport = async (req, res) => {
    try {
      const report = await Report.create({ ...req.body, createdBy: req.user.id });
      res.status(201).json({ report });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

const getReports = async (req, res) => {
    const reports = await Report.find().populate('comments');
    res.json(reports);
  };

  const upvoteReport = async (req, res) => {
    const report = await Report.findByIdAndUpdate(req.params.id, { $inc: { upvotes: 1 } }, { new: true });
    res.json(report);
  };

  const downvoteReport = async (req, res) => {
    const report = await Report.findByIdAndUpdate(req.params.id, { $inc: { downvotes: 1 } }, { new: true });
    res.json(report);
  };

  const flagReport = async (req, res) => {
    const report = await Report.findByIdAndUpdate(req.params.id, { $inc: { flags: 1 } }, { new: true });
    res.json(report);
  };