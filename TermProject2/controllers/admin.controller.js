// Setting up express and creating an app instance
const fs = require('fs');
const express = require("express");
const app = express();


// Using multer for handling multipart/form-data
const multer = require("multer");
app.use(multer().none());

// Parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Parsing JSON bodies
app.use(express.json());

// Importing the admin model
const model = require("../models/admin.model");
const { isDataView } = require('util/types');

// Function to retrieve all items to be approved
function getAll(req, res, next){
  let items = model.getAll();
  try{
    res.render("admin-product-edit", {items: items, title: 'All Items'});
  }catch(err){
    console.error("Error getting items", err.message);
    next(err);
  }
}

// Function to load the main page
function loadMainPage(req, res, next){
  res.render("admin-home");
}

// Function to load the main page
function loadProductEditPage(req, res, next){
  res.render("admin-product-edit", {items: items, title: 'All Items'});
}

// Function to load the main page
function loadBulkUpload(req, res, next){
  res.render("admin-bulk-upload");
}


// Function to handle user logout
function logout(req, res, next){
  req.session.currentUser = null;
  res.redirect("/");
  console.log('admin logged out successfully!');
}

function listNewItem(req, res, next){
  const userID = req.session.currentUser.userID;
  const name = req.body.name;
  const description = req.body.description;
  const imageURL = req.body.imageURL;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const category = req.body.category;

  model.listNewItem(userID, name, description, imageURL, price, quantity, category);

  let items = model.getAll();
  try{
    res.render("admin-product-edit", {items: items, title: 'All Items'});
  }catch(err){
    console.error("Error getting items", err.message);
    next(err);
  }
}

function editItem(req, res, next){
  const productID = req.params.productID; 
  const name = req.body.name;
  const description = req.body.description;
  const imageURL = req.body.imageURL;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const category = req.body.category;
  const isFeatured = req.body.isFeatured;
  
  console.log(name);
  console.log(description);
  console.log(imageURL);
  console.log(price);
  console.log(quantity);
  console.log(category);
  console.log(isFeatured);


  model.editItem(name, description, imageURL, price, quantity, category, isFeatured, productID);

  let items = model.getAll();
  try{
    res.render("admin-product-edit", {items: items, title: 'All Items'});
  }catch(err){
    console.error("Error getting items", err.message);
    next(err);
  }
}

// Function to search for items
function search(req, res, next){
  const {keyword} = req.body;
  console.log(keyword);
  let items = model.search(keyword);
  console.log(items);
  try {
    res.render("admin-product-edit", { items: items, title: 'Searched Items' });
  } catch (err) {
    console.error("Error while searching items ", err.message);
    next(err);
  }
}

// Function to retrieve items by category
function getByCategory(req, res, next){
  let items = model.getByCategory(req.body.category);
  try{
    res.render("admin-product-edit", {items: items, title: "Filtered Items"});
  }catch(err){
    console.error("Error getting items", err.message);
    next(err);
  }
}

// Exporting the functions
module.exports = {
  getAll,
  loadMainPage,
  loadProductEditPage,
  loadBulkUpload,
  logout,
  listNewItem,
  editItem,
  search,
  getByCategory
};
