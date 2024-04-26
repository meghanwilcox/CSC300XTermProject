//this is the userAuthController class, containing the methods for user operations
class UserAuthController {
    constructor(db) {
        this.db = db;
    }

    //this function regsiters a new user (default is that a user is NOT an admin)
    async registerNewUser(userData) {
        try {
            console.log('Attempting to register new user:', userData);
    
            // Insert a new user record into the database
            const result = await this.db.run(
                'INSERT INTO Users (dateCreated, firstName, lastName, email, password, userType) VALUES (?, ?, ?, ?, ?, ?)',
                [userData.dateCreated, userData.firstName, userData.lastName, userData.email, userData.password, userData.userType]
            );
    
            console.log('New user registered successfully:', result);
    
            // Return the newly registered user data
            return { id: result.lastID, ...userData };
        } catch (error) {
            console.error('Error registering new user: ', error);
            throw new Error('Failed to register new user: ' + error.message);
        }
    }

    //this function logs a new user into the site with thier username and password
    async loginUser(userData) {
        try {
            console.log('Attempting to login user:', userData.email);
            
            // Query the database to check if the user exists and the password matches
            const user = await this.db.get(
                'SELECT * FROM Users WHERE email = ? AND password = ?',
                [userData.email, userData.password]
            );
    
            if (!user) {
                throw new Error('Invalid email or password');
            }
    
            console.log('User logged in successfully:', user);
            return user;
        } catch (error) {
            console.error('Error logging in user:', error);
            throw new Error('Failed to login user: ' + error.message);
        }
    }

    //this function checks to see if a user is an admin based on theri username and password
    async isUserAdmin (userData) {
        try {
            console.log("Attempting to validate admin user: ", userData.email);

            //query the db to see if user is an admin
            const user = await this.db.get(
                'SELECT * FROM Users WHERE email = ?',
                [userData.email]
            );

            if(user) {
                // Check if user exists and isAdmin is set to true (assuming 1 represents true for isAdmin)
                if (user.userType === "admin") {
                    console.log("User is an admin:", user.email);
                    return true;
                } else {
                    console.log("User is not an admin:", user.email);
                    return false;
                }
            } else {
                console.log("User not found");
                return false;
            }
            
        } catch (error) {
            console.error('Error checking if user is an admin: ', error);
            throw new Error('Failed to check if user is admin: ' + error.message);
        }
    }

    //this function sets the status of a users cart to abandoned if they have a cart
    async abandonCart(cartData) {
        try {
            console.log('Attempting to abandon cart:', cartData.userID, cartData.cartID);
    
            // Update the approval status of the item in the database
            const result = await this.db.run(`
                UPDATE Carts 
                SET status = 'abandoned' 
                WHERE userID = ? 
                AND cartID = ? 
                AND EXISTS (
                    SELECT 1 
                    FROM Carts 
                    WHERE userID = ? 
                    AND cartID = ?
                );`,
                [cartData.userID, cartData.cartID]
            );
    
            console.log('Cart abandoned successfully:', result);
    
            return result.changes;
            
        } catch (error) {
            console.error('Error purchasing cart:', error);
            throw new Error('Failed to purchase cart: ' + error.message);
        }
    }
    //this function fetches all of the information about a product from the database
    async getUserID(userData) {
        try{
            console.log('Attempting to get userID for email: ', userData.email);

            const userID = await this.db.get(
                'SELECT userID FROM USers WHERE email = ?',
                [userData.email]
            );

            if(!userID){
                console.log('No userID found for email: ', userData.email);
                return;
            }

            console.log('UserID retreived successfully!');
            return userID;
            
        } catch(error) {
            console.error('Error getting userID: '. error);
            throw new Error('Failed to get userID' + error.message);
        }
    }


}

module.exports = UserAuthController;