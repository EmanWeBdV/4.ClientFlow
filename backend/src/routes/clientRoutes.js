const express = require('express');
const Client = require('../models/Client');
const Project = require('../models/Project');
const Task = require('../models/Task');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', async (req, res) => {
  const clients = await Client.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(clients);
});

router.get('/:id', async (req, res) => {
  const client = await Client.findOne({ _id: req.params.id, user: req.user._id });
  if (!client) return res.status(404).json({ message: 'Cliente non trovato' });
  res.json(client);
});

router.post('/', async (req, res) => {
  const client = await Client.create({ ...req.body, user: req.user._id });
  res.status(201).json(client);
});

router.put('/:id', async (req, res) => {
  const client = await Client.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!client) return res.status(404).json({ message: 'Cliente non trovato' });
  res.json(client);
});

router.delete('/:id', async (req, res) => {
  const client = await Client.findOne({ _id: req.params.id, user: req.user._id });
  if (!client) return res.status(404).json({ message: 'Cliente non trovato' });

  const projects = await Project.find({ client: client._id, user: req.user._id });
  const projectIds = projects.map((project) => project._id);
  await Task.deleteMany({ project: { $in: projectIds }, user: req.user._id });
  await Project.deleteMany({ client: client._id, user: req.user._id });
  await client.deleteOne();

  res.json({ message: 'Cliente eliminato' });
});

module.exports = router;
