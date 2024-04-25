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

// Importing the user model
const model = require("../models/user.model");

// Function to retrieve all items
function getAll(req, res, next) {
  let items = model.getAll();
  try {
    // Rendering the view with retrieved items
    res.render("items-all", { items: items, title: 'All Items', user: req.session.currentUser.email });
  } catch (err) {
    console.error("Error while getting items ", err.message);
    next(err);
  }
}

// Function to load the main page
function loadMainPage(req, res, next){
  let items = model.getFeaturedProducts();
  try{
    res.render("shopper-home", {items: items});
  } catch (err) {
    console.error("Error while getting items ", err.message);
    next(err);
  }
}

// Function to handle user login
function login(req, res, next){
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  try {
    // Retrieving user information from the model
    const user = model.getUserByEmail(email);
    console.log(user[0]);
    //Checking user credentials
    if (!user || user[0].password !== password) {
      console.log(email + ' not authenticated!');
      return; 
    }

    console.log(email + ' authenticated!');

    if(req.session){
      console.log('session is running!');
      req.session.currentUser = user[0];
    }

    // Redirecting user based on role
    if(user[0].userType === 'admin'){
      console.log('admin logged in successfully!');
      //res.redirect('/admin/main');
    }
    else{
      console.log('user logged in successfully');
      res.redirect('/user/main');
    }
    
  } catch (error) {
    console.error('Error while logging in:', error);
    res.status(500).send('Internal Server Error');
  }
}

// Function to render the registration page
function loadRegisterPage(req, res, next){
  res.render('register');
}

// Function to retrieve an item by ID
function getOneById(req, res, next) {
  let productID = req.params.productID;
  try {
    let item = model.getOneById(productID);
    if (!item) {
      console.error("Item not found for productID:", productID);
      // Handle the situation where the item is not found, maybe send a 404 response
      return res.status(404).send("Item not found");
    }
    let name = item.name;
    console.log("Name:", name);
    res.render("item-details", { item: item, imageURL: item.imageURL });
  } catch (err) {
    console.error("Error while getting item ", err.message);
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
    res.render("search-results", { items: items, title: 'Searched Items' });
  } catch (err) {
    console.error("Error while searching items ", err.message);
    next(err);
  }
}

// Function to retrieve items by category
function getByCategory(req, res, next){
  let items = model.getByCategory(req.body.category);
  try{
    res.render("category-listings", {items: items, title: req.body.category});
  }catch(err){
    console.error("Error getting items", err.message);
    next(err);
  }
}

// Function to add a product to the cart
function addToCart(req, res, next) {
  // Extract userID from session
  let userID = req.session.currentUser.userID;
  console.log('UserID:', userID);

  // Extract productID from request body
  let productID = req.body.productID;
  console.log('ProductID:', productID);

  // Check if user has an existing cart
  let cart = model.checkForNewCart(userID);
  console.log('Number of carts found for user:', cart[0].count);

  if (cart[0].count > 0) {
    // Cart exists, retrieve it and insert into it
    const existingCart = model.getCart(userID);
    const existingCartID = existingCart[0].cartID;

    // Check if the product already exists in the cart
    const product = model.checkExistingProduct(userID, existingCartID, productID);
    
    if (product[0].count) {
      // Increase quantity by 1 if product exists in cart
      let newQuantity = product[0].quantity + 1;
      let updatedCartProduct = model.editCartQuantity(userID, existingCartID, productID, newQuantity);
      console.log('Updated cart product:', updatedCartProduct);
    } else {
      // No existing entry in cart for this product, add as normal
      let cartProduct = model.createCartProduct(userID, existingCartID, productID);
      console.log('New cart product added:', cartProduct);
    }
  } else {
    // Create a new cart if user doesn't have one
    const newCart = model.createNewCart(userID);
    const cartID = newCart.lastInsertRowid;
    console.log('New cart created with ID:', cartID);

    // Create the cart product for the new cart
    let cartProduct = model.createCartProduct(userID, cartID, productID);
    console.log('New cart product added:', cartProduct);
  }
}

// Function to retrieve products in the cart
function getCartProducts(req, res, next){
  const userID = req.session.currentUser.userID;
  const cartProducts = model.getCartProducts(userID);
  console.log("Products in cart for cart page: " + JSON.stringify(cartProducts));
  console.log("cartid: "+  JSON.stringify(cartProducts[0].cartID));

  if(!JSON.stringify(cartProducts[0])){
    //load empty cart page
    res.render("empty-cart");
  }
  else{
    const cartID = JSON.stringify(cartProducts[0].cartID);
    let totalQuantity = 0;
    let subtotal = 0;
    const taxRate = 0.0675; // Tax rate of 6.75%

    // Loop through cartProducts and sum up the quantities
    cartProducts.forEach(product => {
      totalQuantity += product.quantity;
      subtotal += product.quantity * product.price; // Assuming there's a price attribute for each product
    });

    // Calculate tax
    let tax = subtotal * taxRate;
    tax = parseFloat(tax.toFixed(2)); // Trim to 2 decimal points

    // Calculate total price
    let totalPrice = subtotal + tax + 15.0;
    totalPrice = parseFloat(totalPrice.toFixed(2)); // Trim to 2 decimal points

    console.log("Total quantity of products in cart: " + totalQuantity);
    console.log("Subtotal before tax: " + subtotal);
    console.log("Tax: " + tax);
    console.log("Total price including tax: " + totalPrice);

    res.render("cart", { items: cartProducts, totalQuantity: totalQuantity, subtotal: subtotal, tax: tax, totalPrice: totalPrice, cartID: cartID });
  }
}

// Function to update cart product quantity
function updateCartProductQuantity(req, res, next){
  let userID = req.session.currentUser.userID;
  let cartID = req.body.cartID;
  let productID = req.body.productID;
  let newQuantity = req.body.newQuantity;

  let OKresult = model.checkQuantityOK(productID, cartID);

  if(newQuantity <= 0){
    console.log("quantity must be at least 1");
  }
  else if(newQuantity > OKresult[0].Pquantity){
    console.log('quantity too high, not enough stock available!');
  }
  else{
    let updatedProd = model.editCartQuantity(userID, cartID, productID, newQuantity);
    console.log('updated quantity: ' + updatedProd);
    const cartProducts = model.getCartProducts(userID);
  console.log("Products in cart for cart page: " + JSON.stringify(cartProducts));
  console.log("cartid: "+  JSON.stringify(cartProducts[0].cartID));

  if(!JSON.stringify(cartProducts[0])){
    //load empty cart page
    res.render("empty-cart");
  }
  else{
    let totalQuantity = 0;
    let subtotal = 0;
    const taxRate = 0.0675; // Tax rate of 6.75%

    // Loop through cartProducts and sum up the quantities
    cartProducts.forEach(product => {
      totalQuantity += product.quantity;
      subtotal += product.quantity * product.price; // Assuming there's a price attribute for each product
    });

    // Calculate tax
    let tax = subtotal * taxRate;
    tax = parseFloat(tax.toFixed(2)); // Trim to 2 decimal points

    // Calculate total price
    let totalPrice = subtotal + tax + 15.0;
    totalPrice = parseFloat(totalPrice.toFixed(2)); // Trim to 2 decimal points

    console.log("Total quantity of products in cart: " + totalQuantity);
    console.log("Subtotal before tax: " + subtotal);
    console.log("Tax: " + tax);
    console.log("Total price including tax: " + totalPrice);

    res.render("cart", { items: cartProducts, totalQuantity: totalQuantity, subtotal: subtotal, tax: tax, totalPrice: totalPrice, cartID: cartID });
  }
}
}

// Function to remove a product from the cart
function removeCartProduct(req, res, next){
  const userID = req.session.currentUser.userID;
  const cartID = req.body.cartID;
  const productID = req.body.productID;
  model.removeCartProduct(userID, cartID, productID);
  const cartProducts = model.getCartProducts(userID);

  if(!JSON.stringify(cartProducts[0])){
    //load empty cart page
    res.render("empty-cart");
  }
  else{
    let totalQuantity = 0;
    let subtotal = 0;
    const taxRate = 0.0675; // Tax rate of 6.75%

    // Loop through cartProducts and sum up the quantities
    cartProducts.forEach(product => {
      totalQuantity += product.quantity;
      subtotal += product.quantity * product.price; // Assuming there's a price attribute for each product
    });

    // Calculate tax
    let tax = subtotal * taxRate;
    tax = parseFloat(tax.toFixed(2)); // Trim to 2 decimal points

    // Calculate total price
    let totalPrice = subtotal + tax + 15.0;
    totalPrice = parseFloat(totalPrice.toFixed(2)); // Trim to 2 decimal points

    console.log("Total quantity of products in cart: " + totalQuantity);
    console.log("Subtotal before tax: " + subtotal);
    console.log("Tax: " + tax);
    console.log("Total price including tax: " + totalPrice);

    res.render("cart", { items: cartProducts, totalQuantity: totalQuantity, subtotal: subtotal, tax: tax, totalPrice: totalPrice, cartID: cartID });
  }
}

// Function to handle cart purchase
function purchaseCart(req, res, next){
  const userID = req.session.currentUser.userID;
  const cartID = req.body.cartID;

  model.cartPurchased(userID, cartID);

  const cartProducts = model.getCartProducts(userID);

  if(!JSON.stringify(cartProducts[0])){
    //load empty cart page
    res.render("empty-cart");
  }
  else{
    let totalQuantity = 0;
    let subtotal = 0;
    const taxRate = 0.0675; // Tax rate of 6.75%

    // Loop through cartProducts and sum up the quantities
    cartProducts.forEach(product => {
      //decrease product quantity
      totalQuantity += product.quantity;
      subtotal += product.quantity * product.price; // Assuming there's a price attribute for each product
    });

    // Calculate tax
    let tax = subtotal * taxRate;
    tax = parseFloat(tax.toFixed(2)); // Trim to 2 decimal points

    // Calculate total price
    let totalPrice = subtotal + tax + 15.0;
    totalPrice = parseFloat(totalPrice.toFixed(2)); // Trim to 2 decimal points

    console.log("Total quantity of products in cart: " + totalQuantity);
    console.log("Subtotal before tax: " + subtotal);
    console.log("Tax: " + tax);
    console.log("Total price including tax: " + totalPrice);

    res.render("cart", { items: cartProducts, totalQuantity: totalQuantity, subtotal: subtotal, tax: tax, totalPrice: totalPrice, cartID: cartID });
  }
}

// Function to handle user logout
function logout(req, res, next){
  const userID = req.session.currentUser.userID;

  //check if a cart exists for this user
  const cart = model.getCart(userID);
  
  if(!JSON.stringify(cart)){
    //no cart exists for user, can logout
    req.session.currentUser = null;
    res.redirect("/");
    console.log("user logged out successfully");
  } else {
    const cartID = JSON.stringify(cart[0].cartID);
    model.abandonCart(userID, cartID);
    req.session.currentUser = null;
    res.redirect("/");
    console.log('user logged out successfully!');
  } 
}

//function to register a new user
function register(req, res, next){
    let password = req.body.password;
    let email = req.body.email;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
        
    let params = [firstName, lastName, email, password];

    console.log(params);
    model.register(params);
    res.render("index");
}

// Exporting all functions
module.exports = {
  getAll,
  loadMainPage,
  login,
  loadRegisterPage,
  getOneById,
  search,
  getByCategory,
  logout,
  addToCart,
  getCartProducts,
  updateCartProductQuantity,
  removeCartProduct,
  purchaseCart,
  register
};
