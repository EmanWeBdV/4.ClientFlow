const express = require('express');
const Project = require('../models/Project');
const Task = require('../models/Task');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Progetti e task non completati che scadono entro 7 giorni o gia scaduti
router.get('/', protect, async (req, res) => {
  const now = new Date();
  const soon = new Date();
  soon.setDate(now.getDate() + 7);

  const [projects, tasks] = await Promise.all([
    Project.find({ user: req.user._id, status: { $ne: 'Completato' }, dueDate: { $lte: soon } })
      .populate('client', 'name')
      .sort({ dueDate: 1 }),
    Task.find({ user: req.user._id, status: { $ne: 'Completata' }, dueDate: { $lte: soon } })
      .populate('project', 'title')
      .sort({ dueDate: 1 })
  ]);

  const items = [
    ...projects.map((project) => ({
      id: project._id,
      type: 'progetto',
      title: project.title,
      context: project.client?.name,
      dueDate: project.dueDate,
      overdue: project.dueDate < now
    })),
    ...tasks.map((task) => ({
      id: task._id,
      type: 'task',
      title: task.title,
      context: task.project?.title,
      dueDate: task.dueDate,
      overdue: task.dueDate < now
    }))
  ].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  res.json({ items });
});

module.exports = router;
