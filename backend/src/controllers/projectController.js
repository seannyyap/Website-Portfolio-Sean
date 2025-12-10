const mongoose = require('mongoose');
const Project = require('../models/Project');

// Helper to check DB connection
const checkDBConnection = () => {
  if (mongoose.connection.readyState !== 1) {
    throw new Error('Database not connected. Please check your MongoDB connection.');
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    checkDBConnection();
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    checkDBConnection();
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new project
exports.createProject = async (req, res) => {
  try {
    checkDBConnection();
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    checkDBConnection();
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    checkDBConnection();
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

