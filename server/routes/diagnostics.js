const express = require('express');
const router = express.Router();
const diagnosticsController = require('../controllers/diagnosticsController');

router.post('/diagnostics', diagnosticsController.createDiagnostic);
router.get('/diagnostics', diagnosticsController.getAllDiagnostics);
router.delete('/diagnostics/:id', diagnosticsController.deleteDiagnosticById);

module.exports = router;
