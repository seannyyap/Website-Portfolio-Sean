const express = require('express');
const router = express.Router();

// Import controllers
const projectController = require('../controllers/projectController');

// API Info endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Portfolio API',
    version: '1.0.0',
    endpoints: {
      projects: '/api/projects',
      health: '/health'
    }
  });
});

// Project routes
router.get('/projects', projectController.getAllProjects);
router.get('/projects/:id', projectController.getProjectById);
router.post('/projects', projectController.createProject);
router.put('/projects/:id', projectController.updateProject);
router.delete('/projects/:id', projectController.deleteProject);

module.exports = router;

