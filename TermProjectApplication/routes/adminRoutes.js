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

// Initialize the UserAuthController with the database connection
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

})();

module.exports = router;



