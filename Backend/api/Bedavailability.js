const express = require('express');
const Hospital = require('../models/Hospital_login'); // Adjust the path as necessary
const router = express.Router();

// Route to update beds
router.put('/updatebeds', async (req, res) => {
  const { username, beds } = req.body;

  console.log('Received request to update beds:', { username, beds });

  // Validate bed count
  if (typeof beds !== 'number' || beds < 0) {
      return res.status(400).json({ status: 'FAILED', message: 'Invalid bed count!' });
  }

  try {
      // Update hospital record using findOneAndUpdate
      const hospital = await Hospital.findOneAndUpdate(
          { username: username },
          { beds: beds },
          { new: true } // Return the updated document
      );

      if (!hospital) {
          return res.status(404).json({ status: 'FAILED', message: 'Hospital not found!' });
      }

      console.log('Updated bed count:', hospital.beds);

      res.status(200).json({
          status: 'SUCCESS',
          message: 'Bed count updated successfully!',
          availablebeds: hospital.beds,
      });
  } catch (err) {
      console.error('Error updating beds:', err);
      res.status(500).json({
          status: 'FAILED',
          message: 'An error occurred while updating bed count!',
          error: err.message,
      });
  }
});

module.exports = router;
