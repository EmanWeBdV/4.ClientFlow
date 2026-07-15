const express = require('express');
const Activity = require('../models/Activity');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, async (req, res) => {
  const activities = await Activity.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(100);
  res.json(activities);
});

module.exports = router;
