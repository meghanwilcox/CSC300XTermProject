//this file contains the routes for user authentication
const express = require('express');
const router = express.Router();
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

const AdminController = require('../controllers/admin_controller');

//getDBConnection: a function to establish a connection with the database
async function getDBConnection() {
    const db = await sqlite.open({
        filename: 'data/SipNSnugglesDB.db',
        driver: sqlite3.Database
    });
    return db;
}

// Initialize the admin controller with the database connection
(async () => {

    const db = await getDBConnection();
    const adminController = new AdminController(db);

    // POST endpoint for bulk product upload
    router.post('/bulk-upload', async (req, res) => {
        try {
            const productData = req.body; // Array of products from request body

            // Call the bulkUploadProducts function from the controller
            const result = await adminController.bulkProductUpload(productData);

            // Send a success response
            res.json(result);
        } catch (error) {
            console.error('Error uploading products:', error);
            res.status(500).json({ error: error.message });
        }
    });

    // PUT endpoint for updating product attributes
    router.put('/edit-product-details', async (req, res) => {
        try {
            const productData = req.body; // New data for product attributes from request body

            // Call the updateProduct function from the controller
            const result = await adminController.editProductDetails(productData);

            // Send a success response
            res.json(result);
        } catch (error) {
            console.error('Error updating product attributes:', error);
            res.status(500).json({ error: error.message });
        }
    });

    //defines a route to create a new item
    router.post('/create-new-listing', async (req, res) => {
        try {
            const itemData = req.body;
            const newItem = await adminController.createItemListing(itemData);
            res.status(201).json(newItem);
        } catch (error) {
            console.error('Error creating new item: ', error);
            res.status(500).json({ error: 'Failed to create new item' });
        }
    });

    //Define a route to retreive the list of all items
    router.get('/get-all-products', async (req, res) => {
        try {
            const products = await adminController.getAllProducts();
            res.status(200).json(products);
        } catch(error) {
            console.error('Error retreiving all products: ', error);
            res.status(500).json({error: 'Failed to retreive all products'});
        }
    });


})();





module.exports = router;



