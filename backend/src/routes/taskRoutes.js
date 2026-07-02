const express = require('express');
const Task = require('../models/Task');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', async (req, res) => {
  const tasks = await Task.find({ user: req.user._id })
    .populate('project', 'title status')
    .sort({ dueDate: 1, createdAt: -1 });
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const task = await Task.create({ ...req.body, user: req.user._id });
  const savedTask = await task.populate('project', 'title status');
  res.status(201).json(savedTask);
});

router.put('/:id', async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  ).populate('project', 'title status');

  if (!task) return res.status(404).json({ message: 'Task non trovato' });
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: 'Task non trovato' });
  res.json({ message: 'Task eliminato' });
});

module.exports = router;
