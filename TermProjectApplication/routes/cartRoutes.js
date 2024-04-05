// This file contains the routes for user data operations
const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart_controller');

const cartController = new CartController();



module.exports = router;