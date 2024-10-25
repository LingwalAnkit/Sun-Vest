const mongoose = require('mongoose');
const InvestmentSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SolarProject',
      required: true
    },
    shares: {
      type: Number,
      required: true
    },
    investmentAmount: {
      type: Number,
      required: true
    },
    purchaseDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['active', 'sold', 'pending'],
      default: 'active'
    }
  });

  const Investment = mongoose.model('Investment', InvestmentSchema);
  module.exports  = Investment