const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverSchema = new Schema({
    userId: {
        type : String,
        required: true,
    },
    driver_name: {
        type : String,
        required: true
    },
    hospitalId : {
        type : String,
        required: true
    },
    contact_no : {
        type : Number,
        required: true
    }
});

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;