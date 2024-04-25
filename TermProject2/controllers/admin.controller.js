const fs = require('fs');
const db = require('../models/db-conn'); 


// Setting up express and creating an app instance
const express = require("express");
const app = express();

// Using multer middleware for handling multipart/form-data
const multer = require("multer");
app.use(multer().none());

// Parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Importing axios for making HTTP requests
const axios = require('axios');

// Parsing JSON bodies
app.use(express.json());

// Importing the admin model
const model = require("../models/admin.model");


// #################################################

// Function to render the admin main page
function adminMainPage(req, res, next) {
  try {
    // Retrieve products from the database
    let products = model.getAll();
    // Render the admin main page view with the retrieved products
    res.render('admin-main', { products: products });
  } catch (err) {
    console.error("Error while rendering admin main page: ", err.message);
    next(err);
  }
}


// Function to list a new item
function listNewItem(req, res, next) {
  try {
      // Extracting item details from request body
      let userName = req.session.currentUser.userName;
      let name = req.body.name;
      let price = parseFloat(req.body.price);
      let imageURL = req.body.imageURL;
      let description = req.body.description;
      let category = req.body.category;
      let isFeatured = 0;
      
      let params = [userName, name, price, imageURL, description, category, isFeatured];
       model.listNewItem(params);
      res.redirect('/admin/new');

  } catch (err) {
      console.error("Error while creating item ", err.message);
      next(err);
  }
}

// // Function to retrieve all items
function getAll(req, res, next) {
  let product = model.getAll();
  try {
    // Rendering the view with retrieved items
    res.render("main", { product: product, title: 'All Products'});
  } catch (err) {
    console.error("Error while getting items ", err.message);
    next(err);
  }
}

// Function to search for items
function search(req, res, next){
  const {keyword} = req.body;
  console.log(keyword);
  let product = model.search(keyword);
  console.log(product);
  try {
    res.render("admin-main", { product: product, title: 'Searched Items' });
  } catch (err) {
    console.error("Error while searching items ", err.message);
    next(err);
  }
}

// Function to retrieve items by category
function getByCategory(req, res, next){
  let product = model.getByCategory(req.body.category);
  try{
    res.render("admin-category", {product: product, title: 'All Items in '+ req.params.category,});
  }catch(err){
    console.error("Error getting items", err.message);
    next(err);
  }
}

// Controller function to render the edit product form
function renderEditForm(req, res, next) {
  const productId = req.params.id;
  const product = model.getProductById(productId);
  res.render('edit-product', { product: product });
}

// Controller function to handle editing the product details
function editProduct(req, res, next) {
  const productId = req.params.productID;
  const newName = req.body.name;
  const newPrice = req.body.price;
  const newDescription = req.body.description;
  
  // Update the product details in the database
  model.updateProduct(productId, newName, newPrice, newDescription);
  
  // Redirect the user to the main admin page or product list page
  res.redirect('/admin');
}



// Function to render the admin bulk product upload page
function adminBulkUploadPage(req, res) {
  res.render('admin-bulk'); // Render the admin bulk upload page view
}

// Function to handle bulk upload of products from a JSON file
function bulkUpload(req, res, next) {
  try {
      const fileContent = fs.readFileSync(req.file.path);
      const products = JSON.parse(fileContent);
      
      // Bulk insertion of products into the database
      db.serialize(() => {
          const stmt = db.prepare('INSERT INTO Products (name, price, description, imageURL, quantity, category) VALUES (?, ?, ?, ?, ?, ?)');
          products.forEach(product => {
              stmt.run(product.name, product.price, product.description, product.quantity, product.category);
          });
          stmt.finalize();
      });

      // Remove the temporary file
      fs.unlinkSync(req.file.path);

      res.send('Products uploaded successfully!');
  } catch (error) {
      console.error('Error uploading products:', error);
      next(error); // Pass error to error handling middleware
  }
}



// Exporting the functions
module.exports = {
  adminMainPage,
  listNewItem,
  getAll,
  search,
  getByCategory,
  renderEditForm,
  editProduct,
  adminBulkUploadPage,
  bulkUpload

 
};
