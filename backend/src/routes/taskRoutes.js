const express = require('express');
const Task = require('../models/Task');
const protect = require('../middleware/authMiddleware');
const logActivity = require('../utils/logActivity');

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
  await logActivity(req.user._id, 'task', 'creato', `Creato task «${task.title}»`);
  res.status(201).json(savedTask);
});

router.put('/:id', async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: 'Task non trovato' });

  const oldStatus = task.status;
  Object.assign(task, req.body);
  await task.save();
  await task.populate('project', 'title status');

  if (req.body.status && req.body.status !== oldStatus) {
    await logActivity(req.user._id, 'task', 'stato', `Task «${task.title}» passato a ${task.status}`);
  } else {
    await logActivity(req.user._id, 'task', 'modificato', `Modificato task «${task.title}»`);
  }

  res.json(task);
});

router.delete('/:id', async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: 'Task non trovato' });
  await logActivity(req.user._id, 'task', 'eliminato', `Eliminato task «${task.title}»`);
  res.json({ message: 'Task eliminato' });
});

module.exports = router;
