import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

function DiagnosticForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    vehicleId: '',
    speed: '',
    fuelLevel: '',
    engineTemp: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/diagnostics', formData);
      onSubmit(); // Trigger fetch and close modal
    } catch (error) {
      console.error('Error submitting diagnostic:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
      <TextField
        fullWidth
        margin="normal"
        name="vehicleId"
        label="Vehicle ID"
        value={formData.vehicleId}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        name="speed"
        label="Speed (km/h)"
        value={formData.speed}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        name="fuelLevel"
        label="Fuel Level (%)"
        value={formData.fuelLevel}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        name="engineTemp"
        label="Engine Temp (°C)"
        value={formData.engineTemp}
        onChange={handleChange}
      />
      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </Box>
    </Box>
  );
}

export default DiagnosticForm;
