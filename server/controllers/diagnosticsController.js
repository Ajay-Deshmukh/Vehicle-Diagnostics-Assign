const Diagnostic = require('../models/Diagnostic');

// POST: Add new diagnostic data
exports.createDiagnostic = async (req, res) => {
  try {
    const { vehicleId, speed, fuelLevel, engineTemp } = req.body;

    let alert = null;
    if (speed > 120) alert = 'High speed';
    if (engineTemp > 100) alert = 'High engine temperature';

    const diagnostic = new Diagnostic({ vehicleId, speed, fuelLevel, engineTemp, alert });
    await diagnostic.save();
    res.status(201).json(diagnostic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET: Retrieve all diagnostics
exports.getAllDiagnostics = async (req, res) => {
  try {
    const diagnostics = await Diagnostic.find();
    res.status(200).json(diagnostics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE: Delete a diagnostic by ID
exports.deleteDiagnosticById = async (req, res) => {
  try {
    await Diagnostic.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
