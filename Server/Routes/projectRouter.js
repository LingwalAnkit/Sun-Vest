// routes/projectRouter.js
const express = require('express');
const { getAllProjects, createProject } = require('../Controller/ProjectController');
const {investInProject , getUserInvestments} = require('../Controller/InvestmentController');
const {getUserAnalytics , getProjectAnalytics} = require('../Controller/AnalyticsController');
const { protect } = require('../Middleware/authMiddleware')

const router = express.Router();

// Project routes

router.get('/projects', getAllProjects);
router.post('/projects', protect, createProject);



// Investment routes
router.post('/invest', protect, investInProject);
router.get('/investments', protect, getUserInvestments);



// Analytics routes
router.get('/analytics', protect, getUserAnalytics);
router.get('/analytics/project/:projectId', protect, getProjectAnalytics);



module.exports = router;