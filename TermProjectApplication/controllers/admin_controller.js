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

            if(!productData.productID){
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

}

module.exports = AdminController;