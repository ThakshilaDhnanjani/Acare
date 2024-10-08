const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospital_login');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; 

// Middleware to verify the token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ status: 'FAILED', message: 'No token provided' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ status: 'FAILED', message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Update Bed Count Route based on hospitalId passed in the request body
router.put('/update-beds', authenticateToken, async (req, res) => {
  const { hospitalId, beds } = req.body; // Destructure to get hospitalId and beds from the request body

  // Validate inputs
  if (!hospitalId || typeof beds !== 'number' || beds < 0) {
    return res.status(400).json({
      status: 'FAILED',
      message: 'Invalid hospitalId or bed count!',
    });
  }

  try {
    // Find the hospital by hospitalId and update bed count
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({
        status: 'FAILED',
        message: 'Hospital not found!',
      });
    }

    // Update the bed count
    hospital.beds = beds;
    await hospital.save();

    // Respond with success and updated bed count
    res.status(200).json({
      status: 'SUCCESS',
      message: 'Bed count updated successfully!',
      availablebeds: hospital.beds, // Send updated bed count back
    });
  } catch (err) {
    res.status(500).json({
      status: 'FAILED',
      message: 'An error occurred while updating bed count!',
      error: err.message,
    });
  }
});

module.exports = router;
