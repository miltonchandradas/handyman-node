const express = require("express");
const router = express.Router();

const {
   getProjects,
   getProject,
   createProject,
   updateProject,
   deleteProject,
} = require("../controller/projects");

router.route("/").get(getProjects).post(createProject);

router.route("/:id").get(getProject).put(updateProject).delete(deleteProject);

module.exports = router;
