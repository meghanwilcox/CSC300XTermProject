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
                return []; 
            }

            console.log('Featured products retrieved successfully:', featuredProducts);
            return featuredProducts;

        } catch(error) {
            console.error('Error getting featured products: ', error);
            throw new Error('Failed to get featured products');
        }
    }

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
    

}

module.exports = ProductController;