"use strict";
const db = require("../models/db-conn");
const path = require("path");

// Function to retrieve all approved items for sale
function getFeaturedProducts() {
  // SQL query to select all approved items that are not sold
  let sql = "SELECT * FROM Products WHERE isFeatured = 1 AND quantity > 0;";
  // Executing the query
  const data = db.all(sql);
  return data;
};

// Function to retrieve user by username
function getUserByEmail(params){
  // SQL query to select user by username
  let sql = 'SELECT * FROM Users WHERE email = ?;';
  // Executing the query with provided parameters
  const response = db.all(sql, params);
  return response;
};

// Function to retrieve username by email
function getUserNameByEmail(params){
  // SQL query to select username by email
  let sql = 'SELECT userName FROM User WHERE email = ?;';
  // Executing the query with provided parameters
  const response = db.all(sql, params);
  return response;
};

// Function to list a new item for sale
function listNewItem(params){
  // SQL query to insert a new item into the database
  let sql = 'INSERT INTO Item (userName, itemName, itemPrice, description, condition, category, approval_status, sold) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';
  // Executing the query with provided parameters
  const item = db.run(sql, params);
  return  item;
};

// Function to register a new user
function register(params){
  // SQL query to insert a new user into the database
  let sql = 'INSERT INTO User (userName, password, email, firstName, lastName, isAdmin, banned) VALUES (?, ?, ?, ?, ?, ?, ?);';
  // Executing the query with provided parameters
  const newUser = db.run(sql, params);
  return newUser;
};

// Function to retrieve an item by its ID
function getOneById(productID) {
  // SQL query to select an item by its ID
  let sql = "SELECT * FROM Products WHERE productID = ?;";
  //Executing the query with provided parameters
  const item = db.get(sql, productID);
  return item;
};

// Function to retrieve seller's email by item ID
function getSellerEmail(itemID){
  // SQL query to select seller's email by item ID
  let sql = 'SELECT email FROM User INNER JOIN Item WHERE User.userName = Item.userName AND Item.itemID = ?;';
  // Executing the query with provided parameters
  const email = db.get(sql, itemID);
  return email;
};

// Function to search for items by keyword
function search(searchTerm){
  // SQL query to search for items by keyword
  let sql = "SELECT * FROM Item WHERE approval_status = 1 AND sold = 0 AND LOWER(itemName) LIKE ?;";
  // Executing the query with provided parameters
  const data = db.all(sql, `%${searchTerm}%`);
  return data;
}; 

// Function to retrieve items by category
function getByCategory(params){
  // SQL query to select items by category
  let sql = 'SELECT * FROM Products WHERE category = ? AND quantity > 0;';
  // Executing the query with provided parameters
  const items = db.all(sql, params);
  return items;
};

// Function to retrieve pricing information for all items
function getPricingInfoAll(){
  // SQL query to calculate pricing information for all items
  let sql = 'SELECT AVG(itemPrice) AS avg_price, (SELECT COUNT(*) FROM Item) AS numListed, SUM(sold) AS numSold, MAX(itemPrice) AS mostExpensive, MIN(itemPrice) AS leastExpensive FROM Item WHERE sold = 1;';
  // Executing the query
  const data = db.get(sql);
  return data;
};

// Function to retrieve pricing information for items by category
function getPricingInfoCategory(params) {
  // SQL query to calculate pricing information for items by category
  let sql = 'SELECT AVG(itemPrice) AS avg_price,  SUM(sold) AS numSold, MAX(itemPrice) AS mostExpensive, MIN(itemPrice) AS leastExpensive FROM Item WHERE category = ? AND sold = 1;';
  // Executing the query with provided parameters
  const data = db.get(sql, params); 
  return data;
};

// Function to retrieve the number of items listed for a specific category
function getNumListedCategory(params){
  // SQL query to calculate the number of items listed for a specific category
  let sql = 'SELECT COUNT(*) as numListed FROM Item WHERE category = ?;';
  // Executing the query with provided parameters
  const data = db.get(sql, params); 
  return data;
};

// Function to retrieve distinct sellers
function getSellers(){
  // SQL query to select distinct sellers' emails
  let sql = 'SELECT DISTINCT(User.email) FROM Item INNER JOIN User ON Item.userName = User.userName;';
  // Executing the query
  const sellers = db.all(sql);
  return sellers;
};

// Function to retrieve ratings for a user
function getRatings(params){
  // SQL query to select ratings for a user by email
  let sql = 'SELECT User.userName, email, ratingDate, numberOfStars, ratingComment FROM Review INNER JOIN User ON Review.userName = User.userName WHERE User.email = ?;';
  // Executing the query with provided parameters
  const reviews = db.all(sql, params);
  return reviews;
};

// Function to leave a review for a user
function leaveReview(params){
  // SQL query to insert a new review into the database
  let sql = "INSERT INTO Review(userName, ratingDate, numberOfStars, ratingComment) VALUES (?, DATE('now'), ?, ?);";
  // Executing the query with provided parameters
  const newRating = db.run(sql, params);
  return newRating;
};

// Function to retrieve items for sale by a specific user
function getItemsForSale(params){
  // SQL query to select items for sale by a specific user
  let sql = 'SELECT * FROM Item WHERE userName = ? AND approval_status = 1 AND sold = 0;';
  // Executing the query with provided parameters
  const items = db.all(sql, params);
  return items;
};

// Function to retrieve items awaiting approval by a specific user
function getItemsAwaitingApproval(params){
  // SQL query to select items awaiting approval by a specific user
  let sql = 'SELECT * FROM Item WHERE userName = ? AND approval_status = 0 AND sold = 0;';
  // Executing the query with provided parameters
  const items = db.all(sql, params);
  return items;
};

// Function to mark an item as sold
function markSold(params){
  // SQL query to update sold status to 1 for the specified item
  let sql = 'UPDATE Item SET sold = 1 WHERE itemID = ?;';
  // Executing the query with provided parameters
  const item = db.run(sql, params);
  return item;
}

function checkForNewCart(params){
  let sql = `SELECT count(*) as count FROM Carts WHERE status = 'new' AND userID = ?;`;
  const check = db.all(sql, params);
  return check;
}

function createNewCart(params){
  let sql = `INSERT INTO Carts(userID, status, createdDate) VALUES (?, 'new', date('now'));`;
  const newCart = db.run(sql, params);
  return newCart;
}

function createCartProduct(userID, cartID, productID) {
  let sql = `INSERT INTO CartProducts(userID, cartID, productID, quantity) VALUES (?, ?, ?, 1);`;
  const cartProduct = db.run(sql, [userID, cartID, productID]);
  return cartProduct;
}

function getCart(userID){
  let sql = `SELECT cartID FROM Carts WHERE status = 'new' AND userID = ${userID};`;
  const cart = db.all(sql);
  return cart;
}

function checkExistingProduct(userID, cartID, productID){
  let sql = `SELECT count(*) as count, quantity FROM CartProducts WHERE userID = ${userID} AND cartID = ${cartID} AND productID = ${productID};`;
  const product = db.all(sql);
  return product;
}

function editCartQuantity(userID, cartID, productID, newQuantity) {
  let sql = `UPDATE CartProducts SET quantity = ? WHERE userID = ? AND cartID = ? AND productID = ?;`;
  const updatedProduct = db.run(sql, [newQuantity, userID, cartID, productID]);
  return updatedProduct;
}

function getCartProducts(userID){
  let sql = `SELECT P.name, P.price, P.productID, CP.cartID, CP.quantity
  FROM Products AS P
  JOIN CartProducts AS CP ON P.productID = CP.productID
  JOIN Carts AS C ON CP.cartID = C.cartID
  WHERE C.status = 'new' AND C.userID = ?;`;
  const cartProducts = db.all(sql, userID);
  return cartProducts;
}

function removeCartProduct(userID, cartID, productID) {
  let sql = `DELETE FROM CartProducts WHERE userID = ? AND cartID = ? AND productID = ?;`;
  const result = db.run(sql, [userID, cartID, productID]);
  return result;
}

function cartPurchased(userID, cartID){
  let sql = `UPDATE Carts SET status = 'purchased' WHERE userID = ? AND cartID = ?;`;
  const result = db.run(sql, [userID, cartID]);
  return result; 
}

// Exporting all functions
module.exports = {
  getFeaturedProducts,
  getUserByEmail,
  getUserNameByEmail,
  listNewItem,
  register,
  getOneById,
  getSellerEmail,
  search,
  getByCategory,
  getPricingInfoAll,
  getPricingInfoCategory,
  getNumListedCategory,
  getSellers,
  getRatings,
  leaveReview,
  getItemsForSale,
  getItemsAwaitingApproval,
  markSold,
  checkForNewCart,
  createNewCart,
  createCartProduct,
  getCart,
  checkExistingProduct,
  editCartQuantity,
   getCartProducts,
   removeCartProduct,
   cartPurchased
};
