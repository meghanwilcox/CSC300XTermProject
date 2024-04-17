========================================================================
Product Endpoints
========================================================================

1. GET /product/get-featured-products
   - Description: Retrieves a list of featured products.
   - Example Call: GET /get-featured-products
   - JSON Body: None
   - Example JSON Response:
     [
       {
         "productID": 1,
         "name": "Product A",
         "description": "Description of Product A",
         "imageURL": "./images/testimage.png",
         "price": 10.99,
         "quantity": 100,
         "category": "Tea",
         "isFeatured": true
       },
       {
         "productID": 2,
         "name": "Product B",
         "description": "Description of Product B",
         "imageURL": "./images/testimage2.png",
         "price": 15.99,
         "quantity": 50,
         "category": "Coffee",
         "isFeatured": true
       },
       ...
     ]

2. GET /product/get-products-by-category
   - Description: Retrieves a list of products from a specified category.
   - Example Call: GET /get-products-by-category
   - JSON Body: 
    { "category": "Tea" }
    - Example JSON Response: 
     [
       {
         "productID": 3,
         "name": "Product C",
         "description": "Description of Product C",
         "price": 8.99,
         "quantity": 20,
         "category": "Tea",
         "isFeatured": false
       },
       ...
     ]

3. POST /product/get-product
   - Description: Retrieves details of a specific product.
   - Example Call: GET /get-product
   - JSON Body: { "productID": 123 }
   - Example JSON Response:
     {
       "productID": 123,
       "name": "Product X",
       "description": "Description of Product X",
       "price": 25.99,
       "quantity": 30,
       "category": "Accessories",
       "isFeatured": true
     }

4. POST /product/add-product-to-cart
   - Description: Adds a product to the user's cart. If the user doesn't have a cart, a new one is created.
   - Example Call: POST /add-product-to-cart
   - JSON Body: { "userID": 1, "productID": 456, "quantity": 2 }
   - Example JSON Response: 
     {
       "id": 12345,
       "cartID": 67890,
       "userID": 1,
       "productID": 456,
       "quantity": 2
     }

5. GET /product/search
   - Description: Searches for products based on keywords in the product name or description.
   - Example Call: GET /search?keywords=Earl
   - JSON Body: None
   - Example JSON Response: 
     [
       {
         "productID": 5,
         "name": "Earl Grey Tea",
         "description": "A classic Earl Grey tea blend.",
         "price": 9.99,
         "quantity": 15,
         "category": "Tea",
         "isFeatured": false
       },
       ...
     ]

Note: For all endpoints, replace placeholder values in JSON bodies (e.g., category, productID, userID, keywords) with actual data.