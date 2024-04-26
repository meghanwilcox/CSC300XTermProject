//this is the CartController class, containing the methods for cart operations
class CartController {
    constructor(db) {
        this.db = db;
    }

    //this function retreives a list of featured products
    async removeProductFromCart(cartProductData) {
        try {
            console.log('Attempting to remove cart product: ', cartProductData.userID, cartProductData.cartID, cartProductData.productID);

            //execute the delete query to remove the cartproduct from the table
            await this.db.run(
                'DELETE FROM CartProducts WHERE userID = ? AND cartID = ? AND productID = ?',
                [cartProductData.userID, cartProductData.cartID, cartProductData.productID]
            );

            // Check if any rows were affected by the DELETE operation
            const changes = await this.db.get("SELECT changes() AS changes");
            if (changes.changes === 0) {
                console.log("No cartProduct found for productID: ", cartProductData.userID, cartProductData.cartID, cartProductData.productID);
            }

            console.log("Cart product removed successfully!");
        } catch (error) {
            console.error('Error removing cart product: ', error);
            throw new Error('Failed to remove cart products');
        }
    }

    async editCartProductQuantity(cartProductData) {
        try {
            console.log('Attempting to edit quantity for cart product:', cartProductData.userID, cartProductData.cartID, cartProductData.productID);

            // Update the approval status of the item in the database
            const result = await this.db.run(
                'UPDATE CartProducts SET quantity = ? WHERE userID = ? AND cartID = ? AND productID = ?;',
                [cartProductData.quantity, cartProductData.userID, cartProductData.cartID, cartProductData.productID]
            );

            console.log('Cart product quantity successfully edited:', result);
            return result.changes; // Return the number of affected rows
        } catch (error) {
            console.error('Error editing cart product quantity:', error);
            throw new Error('Failed to cart product quantity: ' + error.message);
        }
    }

    //this function retreives a list of products in a specific cart
    async getCartProducts(cartData) {
        try {
            console.log('Attempting to get products for cart:', cartData.userID, cartData.cartID);

            //get the cart products from the database
            const cartProducts = await this.db.all(
                'SELECT * FROM CartProducts WHERE userID = ? AND cartID = ?;',
                [cartData.userID, cartData.cartID]
            );

            if (!cartProducts || cartProducts.length === 0) {
                console.log('No cart products found.');
                return [];
            }

            console.log('Cart products retrieved successfully:', cartProducts);
            return cartProducts;

        } catch (error) {
            console.error('Error getting cart products: ', error);
            throw new Error('Failed to get cart products');
        }
    }

    //this function retreives a list of products in a specific cart
    async getTotalItems(cartData) {
        try {
            console.log('Attempting to get total items for cart:', cartData.userID, cartData.cartID);

            //get the cart products from the database
            const result = await this.db.get(
                'SELECT SUM(quantity) AS total_items FROM CartProducts WHERE userID = ? AND cartID = ?;',
                [cartData.userID, cartData.cartID]
            );

            const sum = result.total_items;

            console.log('Total items in the cart: ', sum);
            return sum;

        } catch (error) {
            console.error('Error getting total products: ', error);
            throw new Error('Failed to get total products');
        }
    }

    //this function returns the subtotal of the price of a users cart
    async getSubtotal(cartData) {
        try {
            console.log('Attempting to get subtotal for cart:', cartData.userID, cartData.cartID);

            // Get the subtotal of products in the cart
            const result = await this.db.get(
                'SELECT SUM(Products.price * CartProducts.quantity) AS subtotal ' +
                'FROM Products ' +
                'INNER JOIN CartProducts ON Products.productID = CartProducts.productID ' +
                'WHERE CartProducts.userID = ? AND CartProducts.cartID = ?',
                [cartData.userID, cartData.cartID]
            );

            const subtotal = result.subtotal;

            console.log('Subtotal: $', subtotal);
            return subtotal;

        } catch (error) {
            console.error('Error getting subtotal: ', error);
            throw new Error('Failed to get subtotal');
        }
    }


    //this function changes the status of a cart to purchased
    async purchaseCart(cartData) {
        try {
            console.log('Attempting to purchase cart:', cartData.userID, cartData.cartID);
    
            // Update the approval status of the item in the database
            const result = await this.db.run(
                "UPDATE Carts SET status = 'purchased' WHERE userID = ? AND cartID = ?;",
                [cartData.userID, cartData.cartID]
            );
    
            console.log('Cart purchased successfully edited:', result);
    
            // Subtract purchased quantities from the total product quantity
            const updateResult = await this.db.run(`
                UPDATE Products 
                SET quantity = quantity - (
                    SELECT quantity 
                    FROM CartProducts 
                    WHERE userID = ? AND cartID = ?
                )
                WHERE productID IN (
                    SELECT productID 
                    FROM CartProducts 
                    WHERE userID = ? AND cartID = ?
                );
            `, [cartData.userID, cartData.cartID, cartData.userID, cartData.cartID]);
    
            console.log('Product quantities updated:', updateResult);
    
            return { cartsAffected: result.changes, productsUpdated: updateResult.changes }; // Return the number of affected rows
        } catch (error) {
            console.error('Error purchasing cart:', error);
            throw new Error('Failed to purchase cart: ' + error.message);
        }
    }

}

module.exports = CartController;