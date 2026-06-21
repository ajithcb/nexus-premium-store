const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Core Global Middleware Setup
app.use(cors());
app.use(express.json());

// 2. Embedded Inline Mongoose Schemas & Database Models
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    countInStock: { type: Number, required: true }
});
const InlineProduct = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const InlineUser = mongoose.models.User || mongoose.model('User', UserSchema);

// 3. Unified Product API Core Route
app.get('/api/products', async (req, res) => {
    try {
        const products = await InlineProduct.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 4. Unified User Registration API Route
app.post('/api/users/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await InlineUser.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await InlineUser.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: newUser._id }, 'SECRET123', { expiresIn: '30d' });
        res.status(201).json({ _id: newUser._id, name: newUser.name, email: newUser.email, token });
    } catch (error) { 
        res.status(500).json({ message: error.message }); 
    }
});

// 5. Unified User Login API Route
app.post('/api/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await InlineUser.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, 'SECRET123', { expiresIn: '30d' });
        res.json({ _id: user._id, name: user.name, email: user.email, token });
    } catch (error) { 
        res.status(500).json({ message: error.message }); 
    }
});

// Base testing ping-check route
app.get('/', (req, res) => {
    res.send('Nexus Cloud E-Commerce API Engine Running Successfully!');
});

// 6. Direct Cluster Connectivity Initialization
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://ajith:test@cluster.mongodb.net/ecommerce")
    .then(() => console.log('Successfully stabilized MongoDB Cluster Tunnel connection!'))
    .catch((err) => console.error('Cloud Cluster Tunnel Connection Error:', err));

app.listen(PORT, () => {
    console.log(`Server environment securely deployed and listening on port ${PORT}`);
});

