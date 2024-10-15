// bed_availability.js
const express = require('express');
const jwt = require('jsonwebtoken');
const Hospital = require('../models/Hospital_login'); // Adjust the path as necessary
const router = express.Router();
const secretKey = 'JWT_SECRET'; // 



// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    if (!token) return res.status(401).json({ status: 'FAILED', message: 'Access token required!' });
    console.log(token);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return
         res.status(403).json({ status: 'FAILED', message: 'Invalid token' });
        req.user = user; // Attach user info to request
        next();
    });
};

router.put('/updatebeds', authenticateToken, async (req, res) => {
  const { username,beds } = req.body;

  /*
router.route("/updatebeds").put(async (req, res) => {
    let driverId = req.params.id;
    const { userId, driver_name, hospitalId, contact_no } = req.body; //D structure

    const updateDriver = {
        //object
        userId,
        driver_name,
        hospitalId,
        contact_no,
    };

    const update = await Driver.findByIdAndUpdate(driverId, updateDriver)
        .then(() => {
            res.status(200).send({
                status: "Driver Updated",
            });
        })
        .catch((err) => {
            console.log(err.message); //goes to terminal
            res.status(500).send({
                status: "Error with updating data",
                error: err.message,
            }); //goes to front end
        });
});
*/ 

  console.log('Received request to update beds:', { username,beds });

  if (typeof beds !== 'number' || beds < 0) {
      return res.status(400).json({ status: 'FAILED', message: 'Invalid bed count!' });
  }

  try {
      const hospital = await Hospital.findOne({
          username: username
      });

      console.log('Found hospital:', hospital); // Log the hospital object

      if (!hospital) {
          return res.status(404).json({ status: 'FAILED', message: 'Hospital not found!' });
      }

      hospital.beds = beds; // Update the bed count
      await hospital.save();

      console.log('Updated bed count:', hospital.beds); // Log the updated bed count

      res.status(200).json({
          status: 'SUCCESS',
          message: 'Bed count updated successfully!',
          availablebeds: hospital.beds,
      });
  } catch (err) {
      console.error('Error updating beds:', err); // Log any error
      res.status(500).json({
          status: 'FAILED',
          message: 'An error occurred while updating bed count!',
          error: err.message,
      });
  }
});


module.exports = router;
