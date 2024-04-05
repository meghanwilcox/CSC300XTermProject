========================================================================
Cart Endpoints
========================================================================

1. DELETE /cart/remove-cart-product
   - Description: Removes a product from the user's cart.
   - Example Call: DELETE /cart/remove-cart-product
   - JSON Body: 
     {
       "userID": 123,
       "cartID": 456,
       "productID": 789
     }
   - Example JSON Response:
     { "message": "Cart product removed successfully!" }

2. PUT /cart/edit-cart-product-quantity
   - Description: Edits the quantity of a product in the user's cart.
   - Example Call: PUT /cart/edit-cart-product-quantity
   - JSON Body: 
     {
       "userID": 123,
       "cartID": 456,
       "productID": 789,
       "quantity": 2
     }
   - Example JSON Response:
     { "message": "Cart product quantity edited successfully!", "affectedRows": 1 }

3. GET /cart/get-cart-products
   - Description: Retrieves a list of products in the user's cart.
   - Example Call: GET /cart/get-cart-products
   - JSON Body: 
     {
       "userID": 123,
       "cartID": 456
     }
   - Example JSON Response:
     [
       {
         "userID": 123,
         "cartID": 456,
         "productID": 789,
         "quantity": 2
       },
       ...
     ]

4. POST /cart/get-total-products
   - Description: Retrieves the total number of items in the user's cart.
   - Example Call: POST /cart/get-total-products
   - JSON Body: 
     {
       "userID": 123,
       "cartID": 456
     }
   - Example JSON Response:
     5

5. POST /cart/get-subtotal
   - Description: Retrieves the subtotal of the price of the user's cart.
   - Example Call: POST /cart/get-subtotal
   - JSON Body: 
     {
       "userID": 123,
       "cartID": 456
     }
   - Example JSON Response:
     54.99

6. PUT /cart/purchase-cart
   - Description: Updates the status of the user's cart to "purchased".
   - Example Call: PUT /cart/purchase-cart
   - JSON Body: 
     {
       "userID": 123,
       "cartID": 456
     }
   - Example JSON Response:
     { "message": "Cart purchased successfully!", "affectedRows": 1 }

Note: For all endpoints, replace placeholder values in JSON bodies (e.g., userID, cartID, productID) with actual data.