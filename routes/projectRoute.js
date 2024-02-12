const express = require("express");

const projectController = require("./../controller/projectController");

const router = express.Router();

router.route("/").post(projectController.createProject);

module.exports = router;
