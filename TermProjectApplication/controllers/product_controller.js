//this is the ProductController class, containing the methods for product operations
class ProductController {
    constructor(db) {
        this.db = db;
    }

    async getFeaturedProducts() {
        try {
            console.log('Attempting to get featured products!');

            //get the featured products from the database
            const featuredProducts = await this.db.all(
                'SELECT * FROM Products WHERE isFeatured = 1;'
            );

            if (!featuredProducts || featuredProducts.length === 0) {
                console.log('No featured products found.');
                return []; // Return an empty array if no flagged users are found
            }

            console.log('Featured products retrieved successfully:', featuredProducts);
            return featuredProducts;

        } catch(error) {
            console.error('Error getting featured products: ', error);
            throw new Error('Failed to get featured products');
        }
    }
    

}

module.exports = ProductController;