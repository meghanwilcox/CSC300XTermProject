"use strict";

// Importing required modules
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

// Function to retrieve user by email
function getUserByEmail(params){
  // SQL query to select user by email
  let sql = 'SELECT * FROM Users WHERE email = ?;';
  // Executing the query with provided parameters
  const response = db.all(sql, params);
  return response;
};

// Function to register a new user
function register(params){
  // SQL query to insert a new user into the database
  let sql = `INSERT INTO Users (dateCreated, firstName, lastName, email, password, userType) VALUES (date('now'), ?, ?, ?, ?, 'shopper');`;
  
  // Executing the query with provided parameters
  const newUser = db.run(sql, params);
  return newUser;
}


// Function to retrieve an item by its ID
function getOneById(productID) {
  // SQL query to select an item by its ID
  let sql = "SELECT * FROM Products WHERE productID = ?;";
  //Executing the query with provided parameters
  const item = db.get(sql, productID);
  return item;
};

// Function to search for items by keyword
function search(searchTerm){
  // SQL query to search for items by keyword
  let sql = "SELECT * FROM Products WHERE name LIKE ?;";
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

// Function to check if user has a new cart
function checkForNewCart(params){
  let sql = `SELECT count(*) as count FROM Carts WHERE status = 'new' AND userID = ?;`;
  const check = db.all(sql, params);
  return check;
}

// Function to create a new cart for user
function createNewCart(params){
  let sql = `INSERT INTO Carts(userID, status, createdDate) VALUES (?, 'new', date('now'));`;
  const newCart = db.run(sql, params);
  return newCart;
}

// Function to create a cart product
function createCartProduct(userID, cartID, productID) {
  let sql = `INSERT INTO CartProducts(userID, cartID, productID, quantity) VALUES (?, ?, ?, 1);`;
  const cartProduct = db.run(sql, [userID, cartID, productID]);
  return cartProduct;
}

// Function to retrieve cart by user ID
function getCart(userID){
  let sql = `SELECT cartID FROM Carts WHERE status = 'new' AND userID = ${userID};`;
  const cart = db.all(sql);
  return cart;
}

// Function to check if product already exists in cart
function checkExistingProduct(userID, cartID, productID){
  let sql = `SELECT count(*) as count, quantity FROM CartProducts WHERE userID = ${userID} AND cartID = ${cartID} AND productID = ${productID};`;
  const product = db.all(sql);
  return product;
}

function checkQuantityOK(productID, cartID){
  // Convert productID and cartID to strings
  productID = String(productID);
  cartID = String(cartID);
  
  let sql = `SELECT P.quantity AS Pquantity, CP.quantity AS CPquantity FROM Products AS P JOIN CartProducts AS CP ON P.productID = CP.productID WHERE CP.productID = ${productID} AND cartID = ${cartID};`;
  const result = db.all(sql);
  return result;
}


// Function to edit cart product quantity
function editCartQuantity(userID, cartID, productID, newQuantity) {
  let sql = `UPDATE CartProducts SET quantity = ? WHERE userID = ? AND cartID = ? AND productID = ?;`;
  const updatedProduct = db.run(sql, [newQuantity, userID, cartID, productID]);
  return updatedProduct;
}

// Function to retrieve products in cart
function getCartProducts(userID){
  let sql = `SELECT P.name, P.price, P.productID, CP.cartID, CP.quantity
  FROM Products AS P
  JOIN CartProducts AS CP ON P.productID = CP.productID
  JOIN Carts AS C ON CP.cartID = C.cartID
  WHERE C.status = 'new' AND C.userID = ?;`;
  const cartProducts = db.all(sql, userID);
  return cartProducts;
}

// Function to remove a product from the cart
function removeCartProduct(userID, cartID, productID) {
  let sql = `DELETE FROM CartProducts WHERE userID = ? AND cartID = ? AND productID = ?;`;
  const result = db.run(sql, [userID, cartID, productID]);
  return result;
}

// Function to mark cart as purchased
function cartPurchased(userID, cartID){
  let sql = `UPDATE Carts SET status = 'purchased' WHERE userID = ? AND cartID = ?;`;
  const result = db.run(sql, [userID, cartID]);
  return result; 
}

// Function to abandon cart
function abandonCart(userID, cartID){
  let sql = `UPDATE Carts SET status = 'abandoned' WHERE userID = ? AND cartID = ?;`;
  const result = db.run(sql, [userID, cartID]);
  return result; 
}

// Exporting all functions
module.exports = {
  getFeaturedProducts,
  getUserByEmail,
  register,
  getOneById,
  search,
  getByCategory,
  checkForNewCart,
  createNewCart,
  createCartProduct,
  getCart,
  checkExistingProduct,
  editCartQuantity,
  getCartProducts,
  removeCartProduct,
  cartPurchased,
  abandonCart,
  checkQuantityOK
};
