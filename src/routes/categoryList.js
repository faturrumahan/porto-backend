const express = require("express");

const CategoryListController = require("../controller/categoryList");

const router = express.Router();

//read - get
router.get("/", CategoryListController.getAllCategories);

module.exports = router;
