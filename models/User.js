const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
