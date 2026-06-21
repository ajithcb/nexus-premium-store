const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products with guaranteed fallback images
router.get('/', async (req, res) => {
    try {
        const rawProducts = await Product.find({});
        
        // This ensures the frontend receives beautiful direct image URLs
        const products = rawProducts.map(product => {
            let img = product.imageUrl;
            if (product.name.includes("Headphones")) {
                img = "https://unsplash.com";
            } else if (product.name.includes("Watch")) {
                img = "https://unsplash.com";
            } else if (product.name.includes("Shoes")) {
                img = "https://unsplash.com";
            }
            
            return {
                ...product._doc,
                imageUrl: img
            };
        });

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. POST a new product (Useful for adding test items)
router.post('/', async (req, res) => {
    const { name, price, description, category, imageUrl, countInStock } = req.body;
    try {
        const newProduct = new Product({ name, price, description, category, imageUrl, countInStock });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
