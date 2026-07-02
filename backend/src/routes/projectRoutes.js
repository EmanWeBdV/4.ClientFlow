const express = require('express');
const Project = require('../models/Project');
const Task = require('../models/Task');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', async (req, res) => {
  const projects = await Project.find({ user: req.user._id })
    .populate('client', 'name email')
    .sort({ createdAt: -1 });
  res.json(projects);
});

router.post('/', async (req, res) => {
  const project = await Project.create({ ...req.body, user: req.user._id });
  const savedProject = await project.populate('client', 'name email');
  res.status(201).json(savedProject);
});

router.put('/:id', async (req, res) => {
  const project = await Project.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  ).populate('client', 'name email');

  if (!project) return res.status(404).json({ message: 'Progetto non trovato' });
  res.json(project);
});

router.delete('/:id', async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id, user: req.user._id });
  if (!project) return res.status(404).json({ message: 'Progetto non trovato' });

  await Task.deleteMany({ project: project._id, user: req.user._id });
  await project.deleteOne();
  res.json({ message: 'Progetto eliminato' });
});

module.exports = router;
