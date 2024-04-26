"use strict";
const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");

router.get("/main", adminController.loadMainPage);
router.get("/loadProdEdit", adminController.loadProductEditPage);
router.get("/loadBulkUpload", adminController.loadBulkUpload);
router.post("/logout", adminController.logout);
router.post("/listItem", adminController.listNewItem);
router.get("/all", adminController.getAll);
router.post("/editItem/:productID", adminController.editItem);
router.post("/search", adminController.search);
router.post("/getCategory", adminController.getByCategory);

module.exports = router;