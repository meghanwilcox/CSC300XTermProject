"use strict";
const express = require("express");
const router = express.Router();


const adminController = require("../controllers/admin.controller");


router.get('/main', adminController.adminMainPage);
router.post('/new', adminController.listNewItem);
router.get('/all', adminController.getAll);
router.post("/search", adminController.search);
router.post('/filter', adminController.getByCategory);

router.get('/edit/:productID', adminController.renderEditForm);
router.post('/edit/:productID', adminController.editProduct);

router.get('/admin-bulk', adminController.adminBulkUploadPage);

module.exports = router;