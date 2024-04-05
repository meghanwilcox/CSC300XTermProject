========================================================================
User Authentication Endpoints
========================================================================

1. Endpoint: /auth/register
   - Description: Registers a new user.
   - Method: POST
   - JSON Body:
     {
         "dateCreated": "YYYY-MM-DD",
         "firstName": "John",
         "lastName": "Doe",
         "email": "john.doe@example.com",
         "password": "password123",
         "userType": "shopper"
     }
   - Example Call: POST /auth/register

2. Endpoint: /auth/login
   - Description: Logs in a user.
   - Method: POST
   - JSON Body:
     {
         "email": "john.doe@example.com",
         "password": "password123"
     }
   - Example Call: POST /auth/login

3. Endpoint: /auth/isAdmin
   - Description: Checks if a user is an admin.
   - Method: POST
   - JSON Body:
     {
         "email": "john.doe@example.com"
     }
   - Example Call: POST /auth/isAdmin

4. Endpoint: /auth/abandon-cart
   - Description: Sets the status of a user's cart to abandoned if they have a cart.
   - Method: PUT
   - JSON Body:
     {
         "userID": 123,
         "cartID": 456
     }
   - Example Call: PUT /auth/abandon-cart