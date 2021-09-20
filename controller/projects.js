const Project = require("../models/Project");
const webpush = require("web-push");

exports.getProjects = async (req, res, next) => {
   try {
      const projects = await Project.find();
      res.status(200).json({
         success: true,
         data: projects,
      });
   } catch (err) {
      res.status(400).json({ success: false });
   }
};

exports.getProject = async (req, res, next) => {
   try {
      const project = await Project.findById(req.params.id);

      if (!project) {
         return res.status(400).json({ success: false });
      }

      res.status(200).json({
         success: true,
         data: project,
      });
   } catch (err) {
      res.status(400).json({ success: false });
   }
};

exports.createProject = async (req, res, next) => {
   try {
      const project = await Project.create(req.body);
      res.status(201).json({
         success: true,
         data: project,
      });
   } catch (err) {
      console.log("Error during project creation: ", err);
      res.status(400).json({ success: false });
   }
};

exports.updateProject = async (req, res, next) => {
   try {
      const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
         runValidators: true,
      });

      if (!project) {
         return res.status(400).json({ success: false });
      }

      res.status(200).json({
         success: true,
         data: project,
      });
   } catch (err) {
      res.status(400).json({ success: false });
   }
};

exports.deleteProject = async (req, res, next) => {
   try {
      const project = await Project.findByIdAndDelete(req.params.id);

      if (!project) {
         return res.status(400).json({ success: false });
      }

      res.status(200).json({
         success: true,
         data: {},
      });
   } catch (err) {
      res.status(400).json({ success: false });
   }
};
