"use strict";
const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/main", userController.loadMainPage);
router.post("/login", userController.login);
router.get("/registerPage", userController.loadRegisterPage);
router.post("/register", userController.register);
router.get("/item-details/:productID", userController.getOneById);
router.post("/search", userController.search);
router.post("/filter", userController.getByCategory);
router.post("/logout", userController.logout);
router.post("/addToCart", userController.addToCart);
router.get("/cartProducts", userController.getCartProducts);
router.post("/updateQuantity", userController.updateCartProductQuantity);
router.post("/removeCartProduct", userController.removeCartProduct);
router.post("/purchaseCart", userController.purchaseCart);
router.get("/impact", userController.impactPage);


module.exports = router;
