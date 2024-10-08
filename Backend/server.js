require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');            //ODM library 

const userRoutes = require('./api/User_login'); // Import user routes
const hospitalRoutes = require('./api/Hospital_login'); // Import Hospital routes
const driverRoutes = require('./api/Driver'); // Import driver routes
const ambulanceRoutes = require('./api/Ambulance'); // Import Ambulance routes
const availableBedRoutes = require('./api/Bed_availability'); // Import bed availability routes

const app = express();       //initializes an Express application.

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Use user routes
app.use('/api/User_login', userRoutes);
app.use('/api/Hospital_login', hospitalRoutes);
app.use('/api/Driver', driverRoutes);
app.use('/api/Ambulance', ambulanceRoutes);
app.use('/api/Bed_availability', availableBedRoutes);


// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,            //options that handle deprecation warnings
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
