const express = require("express");

const ImgurController = require("../controller/imgur");

const router = express.Router();

//delete - delete
router.delete("/:deleteHash", ImgurController.deleteImage);

module.exports = router;
