const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// Add a new product
router.post('/add-product', async (req, res) => {
  try {
    const { name, dateAdded, category, quantity, price, description } = req.body;

    const newProduct = new Product({
      name,
      dateAdded: dateAdded ? new Date(dateAdded) : new Date(),
      category,
      quantity,
      price,
      description
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all products (optional, for admin view)
router.get('/list-products', async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
