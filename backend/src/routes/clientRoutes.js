const express = require('express');
const Client = require('../models/Client');
const Project = require('../models/Project');
const Task = require('../models/Task');
const protect = require('../middleware/authMiddleware');
const logActivity = require('../utils/logActivity');

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
  await logActivity(req.user._id, 'cliente', 'creato', `Creato cliente «${client.name}»`);
  res.status(201).json(client);
});

router.put('/:id', async (req, res) => {
  const client = await Client.findOne({ _id: req.params.id, user: req.user._id });
  if (!client) return res.status(404).json({ message: 'Cliente non trovato' });

  const oldStatus = client.status;
  Object.assign(client, req.body);
  await client.save();

  if (req.body.status && req.body.status !== oldStatus) {
    await logActivity(req.user._id, 'cliente', 'stato', `Cliente «${client.name}» passato a ${client.status}`);
  } else {
    await logActivity(req.user._id, 'cliente', 'modificato', `Modificato cliente «${client.name}»`);
  }

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

  await logActivity(req.user._id, 'cliente', 'eliminato', `Eliminato cliente «${client.name}» con i suoi progetti e task`);
  res.json({ message: 'Cliente eliminato' });
});

module.exports = router;
