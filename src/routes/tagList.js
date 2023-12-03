const express = require("express");

const TagListController = require("../controller/tagList");

const router = express.Router();

//read - get
router.get("/", TagListController.getAllTags);

module.exports = router;
