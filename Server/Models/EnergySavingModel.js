const mongoose = require('mongoose');
const EnergySavingSchema = new mongoose.Schema({
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
    date: {
      type: Date,
      required: true
    },
    energyProduced: {
      type: Number, // in kWh
      required: true
    },
    carbonOffset: {
      type: Number, // in kg
      required: true
    },
    financialSaving: {
      type: Number, // in currency
      required: true
    }
  });

  const EnergySaving = mongoose.model('EnergySaving', EnergySavingSchema);
  module.exports = EnergySaving