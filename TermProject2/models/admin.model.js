"use strict";

// Importing required modules
const db = require("../models/db-conn");
const path = require("path");

// Function to retrieve all items awaiting approval
function getAll() {
  // SQL query to select items with approval_status = 0
  let sql = "SELECT * FROM Products;";
  // Executing the query
  const data = db.all(sql);
  return data;
};


function loadItemToDB(userID, item) {
  // Assuming item is an object with fields corresponding to your database columns
  let sql = `INSERT INTO Products (userID, name, description, imageURL, price, quantity, category, isFeatured) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

  // Extract values from the item object
  const values = [userID, item.name, item.description, item.imageURL, item.price, item.quantity, item.category, item.isFeatured];

  try {
      // Execute the SQL query
      db.run(sql, values);
      console.log('Item added to the database:', item);
  } catch (error) {
      console.error('Error adding item to the database:', error);
      // You might want to handle the error here, depending on your requirements
      throw error; // Re-throwing the error to be caught in parseJSONFile
  }
}

function listNewItem(userID, name, description, imageURL, price, quantity, category) {
  // Assuming item is an object with fields corresponding to your database columns
  let sql = `INSERT INTO Products (userID, name, description, imageURL, price, quantity, category, isFeatured) VALUES (?, ?, ?, ?, ?, ?, ?, 0);`;

  // Extract values from the item object
  const values = [userID, name, description, imageURL, price, quantity, category];

  try {
      // Execute the SQL query
      db.run(sql, values);
      console.log('Item added to the database:');
  } catch (error) {
      console.error('Error adding item to the database:', error);
      // You might want to handle the error here, depending on your requirements
  }
}

function editItem(name, description, imageURL, price, quantity, category, isFeatured, productID){
  let sql = `UPDATE Products SET name = ?, description = ?, imageURL = ?, price = ?, quantity = ?, category = ?, isFeatured = ? WHERE productID = ?`;
  const values = [name, description, imageURL, price, quantity, category, isFeatured, productID];

  try {
    db.run(sql, values);
    console.log('Item updated successfully:', productID);
  } catch (error) {
    console.error('Error updating item:', error);
    throw error; // Re-throwing the error to be caught in your controller or middleware
  }
}

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
  let sql = 'SELECT * FROM Products WHERE category = ?;';
  // Executing the query with provided parameters
  const items = db.all(sql, params);
  return items;
};


// Exporting all functions
module.exports = {
  getAll,
  loadItemToDB,
  listNewItem,
  editItem,
  search,
  getByCategory
};
