//this is the ProductController class, containing the methods for product operations
class ProductController {
    constructor(db) {
        this.db = db;
    }

    //this function retreives a list of featured products
    async getFeaturedProducts() {
        try {
            console.log('Attempting to get featured products!');

            //get the featured products from the database
            const featuredProducts = await this.db.all(
                'SELECT * FROM Products WHERE isFeatured = 1;'
            );

            if (!featuredProducts || featuredProducts.length === 0) {
                console.log('No featured products found.');
                return []; 
            }

            console.log('Featured products retrieved successfully:', featuredProducts);
            return featuredProducts;

        } catch(error) {
            console.error('Error getting featured products: ', error);
            throw new Error('Failed to get featured products');
        }
    }

    //this function retreives a list of all the products in a specific category
    async getProductsByCategory(productData) {
        try {
            console.log('Attempting to fetch products in category: ', productData.category);

            const products = await this.db.all(
                'SELECT * FROM Products WHERE category = ?;',
                [productData.category]
            );

            if (!products || products.length === 0) {
                console.log('No products found for category:', productData.category);
                return []; 
            }

            console.log('Products retrieved successfully:', products);
            return products;
            
        } catch (error) {
            console.error('Error getting products: ', error);
            throw new Error('Failed to get products: ' + error.message);
        }
    }

    //this function fetches all of the information about a product from the database
    async getProductDetails(productData) {
        try{
            console.log('Attempting to get product details for product id: ', productData.productID);

            const product = await this.db.get(
                'SELECT * FROM Products WHERE productID = ?',
                [productData.productID]
            );

            if(!product){
                console.log('No product found for product id: ', productData.productID);
                return;
            }

            console.log('Product retreived successfully!');
            return product;
            
        } catch(error) {
            console.error('Error getting product details: '. error);
            throw new Error('Failed to get product details' + error.message);
        }
    }

    //this function adds a product to a cart. It creates a new cart for a user if they don't already have one, and adds the product to thier cart
    async addProductToCart(data) {
        try {
            // Check if the user already has a cart
            let cartID = await this.db.get('SELECT cartID FROM Carts WHERE userID = ?', [data.userID]);
    
            if (!cartID) {
                // If the user does not have a cart, create a new one and retrieve the cartID
                await this.db.run('INSERT INTO Carts (userID, status, createdDate) VALUES (?, ?, ?)', [data.userID, 'new', new Date().toLocaleDateString('en-CA')]);
                // Retrieve the cartID of the newly created cart
                const result = await this.db.get('SELECT cartID FROM Carts WHERE userID = ?', [data.userID]);
                cartID = result.cartID;
            }
    
            // Add the product to the user's cart
            const result = await this.db.run('INSERT INTO CartProducts (userID, cartID, productID, quantity) VALUES (?, ?, ?, ?)', [data.userID, cartID, data.productID, data.quantity]);
    
            console.log('Product added to cart successfully!');
            return { id: result.lastID, cartID, ...data };
        } catch (error) {
            console.error('Error adding product to cart: ', error);
            throw new Error('Failed to add product to cart: ' + error.message);
        }
    }

    //this function searches for and returns all the products that have a name or description that matches the keywords
    async searchProducts(keywords) {
        try {
            // Construct the SQL query to search for products based on keywords
            const query = `
                SELECT * 
                FROM Products 
                WHERE name LIKE ? OR description LIKE ?
            `;

            // Execute the SQL query against the database
            const products = await this.db.all(query, [`%${keywords}%`, `%${keywords}%`]);

            return products;
        } catch (error) {
            console.error('Error searching for products:', error);
            throw new Error('Failed to search for products');
        }
    }
    

}

module.exports = ProductController;