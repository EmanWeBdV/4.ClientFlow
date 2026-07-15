const Activity = require('../models/Activity');

// Il log non deve mai bloccare l'operazione principale
const logActivity = async (userId, entityType, action, description) => {
  try {
    await Activity.create({ user: userId, entityType, action, description });
  } catch (error) {
    console.error('Errore salvataggio attivita:', error.message);
  }
};

module.exports = logActivity;
