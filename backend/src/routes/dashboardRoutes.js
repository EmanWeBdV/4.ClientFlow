const express = require('express');
const Client = require('../models/Client');
const Project = require('../models/Project');
const Task = require('../models/Task');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, async (req, res) => {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const [clientCount, activeProjectCount, openTaskCount, upcomingTasks, recentClients, recentProjects] =
    await Promise.all([
      Client.countDocuments({ user: req.user._id }),
      Project.countDocuments({ user: req.user._id, status: { $ne: 'Completato' } }),
      Task.countDocuments({ user: req.user._id, status: { $ne: 'Completata' } }),
      Task.find({
        user: req.user._id,
        status: { $ne: 'Completata' },
        dueDate: { $gte: today, $lte: nextWeek }
      })
        .populate('project', 'title')
        .sort({ dueDate: 1 })
        .limit(5),
      Client.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(5),
      Project.find({ user: req.user._id }).populate('client', 'name').sort({ createdAt: -1 }).limit(5)
    ]);

  res.json({
    clientCount,
    activeProjectCount,
    openTaskCount,
    upcomingTasks,
    recentClients,
    recentProjects
  });
});

module.exports = router;
