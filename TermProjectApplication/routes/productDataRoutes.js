// This file contains the routes for user data operations
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product_controller');

const productController = new ProductController();

// Define a route to retrieve the list of featured products
router.get('product/get-featured-products', async (req, res) => {
    try {
        const featuredProducts = await productController.getFeaturedProducts();
        res.status(200).json(featuredProducts); 
    } catch (error) {
        console.error('Error retrieving featured products:', error);
        res.status(500).json({ error: 'Failed to retrieve featured products' });
    }
});

// Define a route to retrieve the list of products from a specfified category
router.get('product/get-products-by-category', async (req, res) => {
    try {
        const productData = req.body;
        const products = await productController.getProductsByCategory(productData);
        res.status(200).json(products); 
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
});

//define a route to retreive a product for a specific productID
router.get('product/get-product', async (req, res) => {
    try {
        const productData = req.body;
        const product = await productController.getProductDetails(productData);
        res.status(200).json(product);
    } catch (error) {
        console.error('Error retreiving product', error);
        res.status(500).json({error: 'Failed to retreive product'})
    }
});

//defines a route to register a new user
router.post('product/add-product-to-cart', async (req, res) => {
    try {
        const data = req.body;
        const cartProduct = await productController.addProductToCart(data);
        res.status(201).json(cartProduct);
    } catch (error) {
        console.error('Error adding product to cart: ', error);
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
});

// Define a route to search for products by keywords
router.get('product/search', async (req, res) => {
    try {
        const { keywords } = req.query;

        if (!keywords) {
            return res.status(400).json({ error: 'Keywords are required for search' });
        }

        const products = await productController.searchProducts(keywords);
        res.json(products);
    } catch (error) {
        console.error('Error searching for products:', error);
        res.status(500).json({ error: 'Failed to search for products' });
    }
});


module.exports = router;