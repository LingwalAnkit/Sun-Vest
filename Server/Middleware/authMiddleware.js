// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');
const AppError = require('../Utils/AppError');

exports.protect = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return next(new AppError('Please log in to access this route', 401));
    }

    // Verify token
    const decoded = jwt.verify(token, 'secretkey123');

    // Check if user still exists
    const user = await User.findById(decoded._id);
    if (!user) {
      return next(new AppError('User no longer exists', 401));
    }

    // Grant access
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};