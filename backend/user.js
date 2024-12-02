const mongoose = require('mongoose');

// Define schema for users
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Create model from schema
const User = mongoose.model('User', userSchema);

module.exports = User;
