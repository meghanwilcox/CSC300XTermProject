//this is the CartController class, containing the methods for cart operations
class AdminController {
    constructor(db) {
        this.db = db;
    }

    //this function retreives a list of featured products
    async bulkProductUpload(productData) {
        try {
            // Ensure products array is provided
            if (!Array.isArray(productData)) {
                throw new Error('Invalid request. Please provide an array of products.');
            }

            // Iterate over each product and insert into the database
            for (const product of productData) {
                const { userID, name, description, imageURL, price, quantity, category, is_Featured } = product;

                // Insert data into the database
                await this.db.run('INSERT INTO Products (userID, name, description, imageURL, price, quantity, category, is_Featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [userID, name, description, imageURL, price, quantity, category, is_Featured]);
            }


            return { success: true, message: 'Bulk product upload successful.' };
        } catch (error) {
            console.error('Error uploading products:', error);
            throw new Error('An error occurred while uploading products.');
        }
    }

    async editProductDetails(productData) {
        try {

            if (!productData.productID) {
                console.log('No product ID found');
                return;
            }
            console.log('Attempting to edit product details for product:', productData.productID);

            // Update the approval status of the item in the database
            const result = await this.db.run(
                'UPDATE Products SET name = ?, description = ?, imageURL = ?, price = ?, quantity = ?, category = ?, is_Featured = ? WHERE productID = ?;',
                [productData.name, productData.description, productData.imageURL, productData.price, productData.quantity, productData.category, productData.is_Featured, productData.productID]
            );

            console.log('Product data successfully edited:');
            return "Afffected rows: " + result.changes; // Return the number of affected rows
        } catch (error) {
            console.error('Error editing cart product quantity:', error);
            throw new Error('Failed to edit product: ' + error.message);
        }
    }

    //this function creates a new item in the database
    async createItemListing(itemData) {
        try {
            console.log('Attempting to create new listing:', itemData);

            // Insert a new item record into the database
            const result = await this.db.run(
                'INSERT INTO Products (userID, name, description, imageURL, price, quantity, category, isFeatured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [itemData.userID, itemData.name, itemData.description, itemData.imageURL, itemData.price, itemData.quantity, itemData.category, itemData.isFeatured]
            );

            console.log('New item created successfully:', result);

            // Return the newly registered user data
            return { id: result.lastID, ...itemData };
        } catch (error) {
            console.error('Error creating new listing.');
            throw new Error('Failed to create new listing:' + error.message);
        }
    }

// ################################################################################################################################################################

    //this function searches for and returns all the products that have a name or description that matches the keywords
    async searchProducts(keywords) {
        try {

            console.log(`Attempting to search for products with keywords: ${keywords}`);
            // Construct the SQL query to search for products based on keywords
            const query = `
                SELECT * 
                FROM Products 
                WHERE name LIKE ? OR description LIKE ?
            `;

            // Execute the SQL query against the database
            const products = await this.db.all(query, [`%${keywords}%`, `%${keywords}%`]);

            console.log('Products found successfully!', products);
            return products;
        } catch (error) {
            console.error('Error searching for products:', error);
            throw new Error('Failed to search for products');
        }
    }

    //this function retrieves all the items frm the database
    async getAllProducts() {
        try {
            console.log('Attempting to get all items!');

             //get the items from the database
             const products = await this.db.all(
                'SELECT * FROM Products;'
             );

             if(!products|| products.length === 0) {
                console.log('No items found.');
                return [];
             }

             console.log('Products retreived successfully: ', products);
             return products;


        } catch(error) {
            console.error('Error retrieving all products');
            throw new Error('Failed to get all products');
        }
    }

}

module.exports = AdminController;