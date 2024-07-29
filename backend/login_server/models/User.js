const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userid: String,
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;