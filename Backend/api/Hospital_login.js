const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Hospital = require('../models/Hospital_login');
const secretKey = process.env.JWT_SECRET;
const authenticate = require('../config/authenticate');

// Signup Route
router.post('/signup', async (req, res) => {
  const {
    username,
    hospitalId,
    email,
    password,
    /*confirmpassword,*/
    beds} = req.body;

 if (!hospitalId || !username || !email || !password ||/*!confirmpassword|| */!beds) {
    return res.json({
      status: 'FAILED',
      message: 'Empty input fields!'
    });
  } else if (!/^[a-zA-Z]*$/.test(username)) {
    return res.json({
      status: 'FAILED',
      message: 'Invalid username entered!'
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return res.json({
      status: 'FAILED',
      message: 'Invalid email entered!'
    });
  } else if (password.length < 8) {
    return res.json({
      status: 'FAILED',
      message: 'Password is too short!'
    });
  }

  try {
    const existingUser = await Hospital.findOne({ hospitalId });
    if (existingUser) {
      return res.json({
        status: 'FAILED',
        message: 'User already exists!'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Hospital({
      username,
      hospitalId,
      email,
      password: hashedPassword,
      /*confirmpassword: hashedPassword,*/
      beds
    });

    const result = await newUser.save();

    // Create JWT payload and sign token
    const payload = { user: { id: result.id } };
    jwt.sign(payload, secretKey, { expiresIn: 3600000 }, (err, token) => {
      if (err) throw err;
      res.json({
        status: "SUCCESS",
        message: "Signup successful!",
        token,
      });
    });

  } catch (err) {
    res.json({
      status: 'FAILED',
      message: 'An error occurred during signup!',
      error: err.message,
    });
  }
});

// Signin Route
router.post('/signin', async (req, res) => {
  const { hospitalId, password } = req.body;

  if (!hospitalId || !password) {
    return res.json({
      status: 'FAILED',
      message: 'Empty input fields!'
    });
  }

  try {
    const user = await Hospital.findOne({ hospitalId });
    if (!user) {
      return res.json({
        status: 'FAILED',
        message: 'Hospital not found!'
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // Create JWT payload and sign token
      const payload = { user: { id: user.id } };
      jwt.sign(payload, secretKey, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({
          status: "SUCCESS",
          message: "Signin successful!",
          token,
          beds: user.beds // pass the beds count separately as well
        });
      });

    } else {
      res.json({
        status: 'FAILED',
        message: 'Invalid password entered!'
      });
    }
  } catch (err) {
    res.json({
      status: 'FAILED',
      message: 'An error occurred during signin!',
      error: err.message,
    });
  }
});
module.exports = router;
