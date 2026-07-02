const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    priority: {
      type: String,
      enum: ['Bassa', 'Media', 'Alta'],
      default: 'Media'
    },
    status: {
      type: String,
      enum: ['Da fare', 'In corso', 'Completata'],
      default: 'Da fare'
    },
    dueDate: Date,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
