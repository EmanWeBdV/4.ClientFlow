const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    entityType: {
      type: String,
      enum: ['cliente', 'progetto', 'task'],
      required: true
    },
    action: {
      type: String,
      enum: ['creato', 'modificato', 'eliminato', 'stato'],
      required: true
    },
    description: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Activity', activitySchema);
