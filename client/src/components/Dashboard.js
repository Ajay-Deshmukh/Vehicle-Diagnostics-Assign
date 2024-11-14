import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import DiagnosticForm from './DiagnosticForm';
import FilterPanel from './FilterPanel';

function Dashboard() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/diagnostics');
      setRecords(response.data);
      setFilteredRecords(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/diagnostics/${id}`);
      fetchRecords();
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const applyFilters = (filters) => {
    let data = [...records];

    if (filters.vehicleId) {
      data = data.filter(record => record.vehicleId.includes(filters.vehicleId));
    }

    if (filters.date) {
      data = data.filter(record => new Date(record.timestamp).toDateString() === filters.date.toDateString());
    }

    setFilteredRecords(data);
  };

  const handleFormSubmit = () => {
    fetchRecords();
    setOpenForm(false);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
        <Typography variant="h4">Vehicle Diagnostics Dashboard</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpenForm(true)}>Add Diagnostic</Button>
      </Box>

      <FilterPanel applyFilters={applyFilters} />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Vehicle ID</TableCell>
            <TableCell>Speed</TableCell>
            <TableCell>Fuel Level</TableCell>
            <TableCell>Engine Temp</TableCell>
            <TableCell>Alert</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRecords.map(record => (
            <TableRow key={record._id} style={{ backgroundColor: record.alert ? '#ffcccb' : '' }}>
              <TableCell>{record.vehicleId}</TableCell>
              <TableCell>{record.speed} km/h</TableCell>
              <TableCell>{record.fuelLevel}%</TableCell>
              <TableCell>{record.engineTemp}°C</TableCell>
              <TableCell>{record.alert || 'Normal'}</TableCell>
              <TableCell>
                <Button color="error" onClick={() => handleDelete(record._id)}>
                  <Delete />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for Diagnostic Form */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Diagnostic</DialogTitle>
        <DialogContent>
          <DiagnosticForm onSubmit={handleFormSubmit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Dashboard;
