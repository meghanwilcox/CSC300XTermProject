const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Import the UserAuthController
const UserAuthController = require('./controllers/user_auth_controller');
const ProductController = require('./controllers/product_controller');

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
    const userAuthController = new UserAuthController(db);

    // Define the route for registering a new user
    app.post('/auth/register', async (req, res) => {
        try {
            const userData = req.body;
            const newUser = await userAuthController.registerNewUser(userData);
            res.json(newUser);
        } catch (error) {
            console.error('Error registering new user:', error);
            res.status(500).json({ error: 'Failed to register new user' });
        }
    });

    // Define the route for logging in a user
    app.post('/auth/login', async (req, res) => {
        try {
            const userData = req.body;
            // Call the appropriate method from UserAuthController to validate the user login
            const user = await userAuthController.loginUser(userData);
            // Return the user data or appropriate response based on validation result
            res.json(user);
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ error: 'Failed to log in user' });
        }
    });

    //define the route for checking if a user is an admin
    app.post('/auth/isAdmin', async (req, res) => {
        try {
            const userData = req.body;
            const user = await userAuthController.isUserAdmin(userData);
            res.json(user);
        } catch (error){
            console.error('Error checking if user is admin: ', error);
            res.status(500).json({ error: 'Failed to check if user is admin'});
        }
    });

})();

//initialize the UserDataController with the database connection
(async () => {
    const db = await getDBConnection();
    const productController = new ProductController(db);

    // Define a route to retrieve the list of featured products
    app.get('/product/get-featured-products', async (req, res) => {
        try {
            const featuredProducts = await productController.getFeaturedProducts();
            res.json(featuredProducts); 
        } catch (error) {
            console.error('Error retrieving featured products:', error);
            res.status(500).json({ error: 'Failed to retrieve featured products' });
        }
    });

        // Define a route to retrieve the list of products in a specific category
    app.get('/product/get-products-by-category', async (req, res) => {
        try {
            const productData = req.body;
            const products = await productController.getProductsByCategory(productData);
            res.json(products); 
        } catch (error) {
            console.error('Error retrieving products:', error);
            res.status(500).json({ error: 'Failed to retrieve products' });
        }
    });

    //define a route to retreive a product for a specific productID
    app.get('/product/get-product', async (req, res) => {
        try {
            const productData = req.body;
            const product = await productController.getProductDetails(productData);
            res.status(200).json(product);
        } catch (error) {
            console.error('Error retreiving product', error);
            res.status(500).json({error: 'Failed to retreive product'})
        }
    });



})();


// Root endpoint
app.get('/', function(req, res) {
    res.send('Hello World!');
});

// Start the server
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
