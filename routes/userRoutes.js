const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/users/register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user email already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists!' });
        }

        // Encrypt the password using bcryptjs
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save the new user profiles directly inside MongoDB
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Generate a secure JWT log token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || 'SECRET123', {
            expiresIn: '30d'
        });

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// POST /api/users/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // 2. Check if password matches using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // 3. Generate a secure token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'SECRET123', {
            expiresIn: '30d'
        });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
