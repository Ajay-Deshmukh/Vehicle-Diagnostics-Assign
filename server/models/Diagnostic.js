const mongoose = require('mongoose');

const diagnosticSchema = new mongoose.Schema({
  vehicleId: { type: String, required: true },
  speed: { type: Number, required: true },
  fuelLevel: { type: Number, required: true },
  engineTemp: { type: Number, required: true },
  alert: { type: String, default: null },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Diagnostic', diagnosticSchema);
