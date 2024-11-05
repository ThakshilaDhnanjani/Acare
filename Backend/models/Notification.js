// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  driverId: {
    type: String,
    ref: 'Driver',
  },
  // Optionally include any additional fields you need
});

module.exports = mongoose.model('Notification', notificationSchema);


