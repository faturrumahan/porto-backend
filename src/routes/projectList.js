const express = require("express");
const multer = require("multer");

const ProjectListController = require("../controller/projectList");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
}).array("images", 5);

//create - post
router.post("/", upload, ProjectListController.createNewProject);
// router.post("/", ProjectListController.createNewProject);

//read - get
router.get("/", ProjectListController.getAllProjects);

//read - get by id
router.get("/:idProject", ProjectListController.getSpecificProject);

//update - patch
router.patch("/:idProject", upload, ProjectListController.updateProject);

//delete - delete
router.delete("/:idProject", ProjectListController.deleteProject);

module.exports = router;
