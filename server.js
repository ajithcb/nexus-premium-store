const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes'); // 1. Import User Routes

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes); // 2. Bind User Authentication Route

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB!'))
    .catch((err) => console.error('Database connection error:', err));

app.get('/', (req, res) => {
    res.send('Your e-commerce backend server is running successfully!');
});

app.listen(PORT, () => {
    console.log(`Server is alive at http://localhost:${PORT}`);
});
