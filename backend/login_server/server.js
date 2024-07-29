//mongodb connection
require('./config/db');

//express server
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./api/User'); // Import user routes

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use user routes
app.use('/api/User', userRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
