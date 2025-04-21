const Report = require('../models/Report');
const User = require('../models/user');

const createReport = async (req, res) => {
    try {
        const { heading, description, communityId } = req.body;
        if (!heading || !description || !communityId) {
            return res.status(400).json({ message: 'Heading, description, and communityId are required.' });
        }
      const report = await Report.create({ ...req.body, createdBy: req.user._id });
      res.status(201).json({ report });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  const getReports = async (req, res) => {
    try {
      const { communityId } = req.params;
      if (!communityId) {
        return res.status(400).json({ message: 'Community ID is required' });
      }
  
      const reports = await Report.find({ communityId })
        .populate('createdBy', 'name pfp') 
        .populate('comments'); 
  
      res.status(200).json({ reports });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  
  const upvoteReport = async (req, res) => {
    try {
      const { userId } = req.body; 
      
      const report = await Report.findById(req.params.id);
      if (!report) {
        return res.status(404).json({ message: 'Report not found' });
      }
      if (report.upvotes.includes(userId)) {
        return res.status(400).json({ message: 'You have already upvoted this report' });
      }
  
      report.upvotes.push(userId);
      report.downvotes = report.downvotes.filter((id) => id.toString() !== userId);

      
      const updatedReport = await report.save();
      res.status(200).json(updatedReport);
    } catch (err) {
      console.error("Error upvoting report:", err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  const downvoteReport = async (req, res) => {
    try {
      const { userId } = req.body; 
  
      const report = await Report.findById(req.params.id);
      if (!report) {
        return res.status(404).json({ message: 'Report not found' });
      }
  
      if (report.downvotes.includes(userId)) {
        return res.status(400).json({ message: 'You have already downvoted this report' });
      }
  
      report.downvotes.push(userId);
      report.upvotes = report.upvotes.filter((id) => id.toString() !== userId);

      
      const updatedReport = await report.save();
      res.status(200).json(updatedReport);
    } catch (err) {
      console.error("Error downvoting report:", err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  const flagReport = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }

        const userId = req.body.userId; 
        if (report.flaggedBy.includes(userId)) {
            return res.status(400).json({ message: 'You have already flagged this report.' });
        }
        report.flaggedBy.push(userId);
        report.flaggedCount += 1;

        const updatedReport = await report.save();
        
        res.status(200).json(updatedReport);
    } catch (err) {
        console.error("Error flagging report:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const unflagReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    const userId = req.body.userId;
    const index = report.flaggedBy.indexOf(userId);

    if (index === -1) {
      return res.status(400).json({ message: 'You have not flagged this report.' });
    }

    report.flaggedBy.splice(index, 1);
    report.flaggedCount = Math.max(0, report.flaggedCount - 1);

    const updatedReport = await report.save();

    res.status(200).json(updatedReport);
  } catch (err) {
    console.error("Error unflagging report:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


  

  module.exports = {
    createReport,
    getReports,
    upvoteReport,
    downvoteReport,
    flagReport,
    unflagReport
  };