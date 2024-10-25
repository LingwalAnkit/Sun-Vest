const mongoose = require('mongoose');
const SolarProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  totalCapacity: {
    type: Number, // in kW
    required: true
  },
  totalShares: {
    type: Number,
    required: true
  },
  availableShares: {
    type: Number,
    required: true
  },
  pricePerShare: {
    type: Number,
    required: true
  },
  expectedReturn: {
    type: Number, // percentage
    required: true
  },
  dailyProduction: [{
    date: Date,
    amount: Number // in kWh
  }],
  status: {
    type: String,
    enum: ['planned', 'construction', 'active', 'maintenance'],
    default: 'planned'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const SolarProject = mongoose.model('SolarProject', SolarProjectSchema);
module.exports = SolarProject