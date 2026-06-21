const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const InlineUser = mongoose.models.User || mongoose.model('User', UserSchema);

// Register Route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await InlineUser.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await InlineUser.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: newUser._id }, 'SECRET123', { expiresIn: '30d' });
        res.status(201).json({ _id: newUser._id, name: newUser.name, email: newUser.email, token });
    } catch (error) { res.status(500).json({ message: error.message }); }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await InlineUser.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, 'SECRET123', { expiresIn: '30d' });
        res.json({ _id: user._id, name: user.name, email: user.email, token });
    } catch (error) { res.status(500).json({ message: error.message }); }
});

module.exports = router;
