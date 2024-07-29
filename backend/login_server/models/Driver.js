const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverSchema = new Schema({
    userid: String,
    // Add any other fields relevant to drivers if necessary
});

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;
