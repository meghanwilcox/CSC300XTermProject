// This file contains the routes for user data operations
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product_controller');

const productController = new ProductController();

// Define a route to retrieve the list of flagged users
router.get('product/get-featured-products', async (req, res) => {
    try {
        const featuredProducts = await productController.getFeaturedProducts();
        res.status(200).json(featuredProducts); 
    } catch (error) {
        console.error('Error retrieving featured products:', error);
        res.status(500).json({ error: 'Failed to retrieve featured products' });
    }
});


module.exports = router;