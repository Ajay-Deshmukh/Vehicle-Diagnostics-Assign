import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import dayjs from 'dayjs';

function FilterPanel({ applyFilters }) {
  const [filters, setFilters] = useState({ vehicleId: '', date: null });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    setFilters({ ...filters, date: e.target.value ? dayjs(e.target.value).toDate() : null });
  };

  const handleApplyFilters = () => {
    applyFilters(filters);
  };

  return (
    <Box display="flex" gap={2} my={2}>
      <TextField label="Vehicle ID" name="vehicleId" onChange={handleFilterChange} />
      <TextField type="date" label="Date" InputLabelProps={{ shrink: true }} onChange={handleDateChange} />
      <Button variant="contained" onClick={handleApplyFilters}>Apply Filters</Button>
    </Box>
  );
}

export default FilterPanel;
