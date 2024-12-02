const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./user'); // Adjust the path as necessary
const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    const { name, phone, password } = req.body;

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, phone, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { phone, password } = req.body;

    try {
        const user = await User.findOne({ phone });
        if (user && await bcrypt.compare(password, user.password)) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(400).json({ error: 'Invalid phone number or password' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

res.json({ message: 'Login successful', name: user.name });

module.exports = router;
