const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    hospitalId: String,
    email: String,
    password: String,
    /*confirmpassword: String,*/
    beds: Number
});

const Hospital = mongoose.model('Hospital_login', userSchema);
module.exports = Hospital;