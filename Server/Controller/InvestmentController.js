const SolarProject = require('../Models/SolarModel');
const Investment = require('../Models/InvestmentModel');
const AppError = require('../Utils/AppError');

exports.investInProject = async (req, res, next) => {
    try {
      const { projectId, shares } = req.body;
      const userId = req.user._id;
  
      const project = await SolarProject.findById(projectId);
      if (!project) {
        return next(new AppError('Project not found', 404));
      }
  
      if (project.availableShares < shares) {
        return next(new AppError('Not enough shares available', 400));
      }
  
      const investmentAmount = shares * project.pricePerShare;
  
      const investment = await Investment.create({
        user: userId,
        project: projectId,
        shares,
        investmentAmount
      });
  
      // Update available shares
      project.availableShares -= shares;
      await project.save();
  
      res.status(201).json({
        status: 'success',
        data: investment
      });
    } catch (error) {
      next(error);
    }
  };

  exports.getUserInvestments = async (req, res, next) => {
    try {
        const userId = req.user._id;
        
        // Find all investments made by the user
        const investments = await Investment.find({ user: userId }).populate('project', 'name pricePerShare');

        res.status(200).json({
            status: 'success',
            data: investments
        });
    } catch (error) {
        next(error);
    }
};