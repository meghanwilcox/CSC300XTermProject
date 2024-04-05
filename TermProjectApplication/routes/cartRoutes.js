//this file contains the routes for user authentication
const express = require('express');
const router = express.Router();
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

const CartController = require('../controllers/cart_controller');

//getDBConnection: a function to establish a connection with the database
async function getDBConnection() {
    const db = await sqlite.open({
    filename: 'data/SipNSnugglesDB.db',
    driver: sqlite3.Database
    });
    return db;
}

// Initialize the UserAuthController with the database connection
(async () => {

    const db = await getDBConnection();
    const cartController = new CartController(db);

    // Define a route to remove a  user
    router.delete('/remove-cart-product', async (req, res) => {
        try {
            const cartProductData = req.body; // Assuming the username is sent in the request body

            // Call the removeFlaggedUser method from the UserDataController to remove the flagged user
            await cartController.removeProductFromCart(cartProductData);

            // Respond with a success message
            res.status(200).json({ message: 'Cart product removed successfully!' });
        } catch (error) {
            console.error('Error removing cart product:', error);
            res.status(500).json({ error: 'Failed to remove cart product' });
        }
    });

    // Define a route to update the approval status of an item
    router.put('/edit-cart-product-quantity', async (req, res) => {
        try {
            const cartProductData = req.body;
            const result = await cartController.editCartProductQuantity(cartProductData);
            res.status(200).json({ message: 'Cart product quantity edited successfully!', affectedRows: result });
        } catch (error) {
            console.error('Error editing cart product quantity:', error);
            res.status(500).json({ error: 'Failed to cart product quantity' });
        }
    });

    //Define a route to retrieve the list of featured products
    router.get('/get-cart-products', async (req, res) => {
        try {
            const cartData = req.body;
            const cartProducts = await cartController.getCartProducts(cartData);
            res.status(200).json(cartProducts); 
        } catch (error) {
            console.error('Error retrieving cart products:', error);
            res.status(500).json({ error: 'Failed to retrieve cart products' });
        }
    });

    //define a route to get the total number of items in the cart
    router.post('/get-total-products', async (req, res) => {
        try {
            const cartData = req.body; // Use req.body to access JSON body
            const totalItems = await cartController.getTotalItems(cartData);
            res.status(200).json(totalItems);
        } catch(error) {
            console.error('Error getting total number of items in cart:', error);
            res.status(500).json({ error: 'Failed to get total items' });
        }
    });

    //define a route to get the subtotal of the price of the cart
    router.post('/get-subtotal', async (req, res) => {
        try {
            const cartData = req.body; // Use req.body to access JSON body
            const subtotal = await cartController.getSubtotal(cartData);
            res.status(200).json(subtotal);
        } catch(error) {
            console.error('Error getting subtotal:', error);
            res.status(500).json({ error: 'Failed to get subtotal' });
        }
    });

    // Define a route to update the status of a cart to purchased
    router.put('/purchase-cart', async (req, res) => {
        try {
            const cartData = req.body;
            const result = await cartController.purchaseCart(cartData);
            res.status(200).json({ message: 'Cart purchased successfully!', affectedRows: result });
        } catch (error) {
            console.error('Error purchasing cart:', error);
            res.status(500).json({ error: 'Failed to purchase cart' });
        }
    });






})();

module.exports = router;
