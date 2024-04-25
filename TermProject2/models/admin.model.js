"use strict";
const db = require("../models/db-conn");
const path = require("path");

// Function to list a new item for sale
function listNewItem(params){
  // SQL query to insert a new item into the database
  let sql = 'INSERT INTO Products (userID, name, price, description, quantity, category, isFeatured) VALUES (?, ?, ?, ?, ?, ?, ?);';
  // Executing the query with provided parameters
  const product = db.run(sql, params);
  return  product;
};

// Function to retrieve all approved items for sale
function getAll() {
  // SQL query to select all approved items that are not sold
  let sql = "SELECT * FROM Products;";
  // Executing the query
  const data = db.all(sql);
  return data;
};

// Function to search for items by keyword
function search(searchTerm){
  // SQL query to search for items by keyword
  let sql = "SELECT * FROM Products WHERE LOWER(itemName) LIKE ?;";
  // Executing the query with provided parameters
  const data = db.all(sql, `%${searchTerm}%`);
  return data;
}; 

// Function to retrieve items by category
function getByCategory(params){
  // SQL query to select items by category
  let sql = "SELECT * FROM Products WHERE category = ?;";
  // Executing the query with provided parameters
  const product = db.all(sql, params);
  return product;
};



// Exporting all functions
module.exports = {
  listNewItem,
  getAll,
  search,
  getByCategory,
};
