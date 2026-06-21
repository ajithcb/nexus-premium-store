const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// SOLID EMBEDDED INLINE MODEL DEFINITION TO BYPASS FOLDER STRUCTURE CLASHES
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    countInStock: { type: Number, required: true }
});

const InlineProduct = mongoose.models.Product || mongoose.model('Product', ProductSchema);

// GET all products route
router.get('/', async (req, res) => {
    try {
        const products = await InlineProduct.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
