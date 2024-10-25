const  SolarProject = require('../Models/SolarModel');
const AppError = require('../Utils/AppError');

exports.createProject = async (req, res, next) => {
  try {
    const project = await SolarProject.create(req.body);
    res.status(201).json({
      status: 'success',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await SolarProject.find();
    res.setHeader('Content-Type', 'application/json'); // Explicitly set Content-Type
    res.status(200).json({
      status: 'success',
      data: projects
    });
  } catch (error) {
    next(error);
  }
};