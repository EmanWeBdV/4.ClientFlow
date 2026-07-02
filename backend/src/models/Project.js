const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
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
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true
    },
    status: {
      type: String,
      enum: ['Da iniziare', 'Attivo', 'In revisione', 'Completato'],
      default: 'Da iniziare'
    },
    startDate: Date,
    dueDate: Date,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
