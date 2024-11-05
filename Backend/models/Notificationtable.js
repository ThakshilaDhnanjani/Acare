const mongoose = require('mongoose');

const notificationtableSchema = new mongoose.Schema({
  senderHospital: { type: String, required: true },
  targetHospitalId: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notificationtable', notificationtableSchema);