import React, { useState, useContext } from 'react';
import { AppState } from '../App.js';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

const SelectShifts = ({ setSelectedShift }) => {
  const { shiftData } = useContext(AppState);
  const [shift, setShift] = useState(0);

  const handleChange = (event) => {
    setShift(event.target.value);
    setSelectedShift(event.target.value);
  };

  return (
    <Box sx={{m: 1, my: 2}}>
      <FormControl style={{minWidth: 525}}>
        <InputLabel id="shift-label">Shift</InputLabel>
        <Select
          labelId="shift-select-label"
          id="shift-select-id"
          value={shift}
          label="Shift"
          onChange={handleChange}
        >
          <MenuItem key={0} value={0}>Select Shift</MenuItem>
          {Object.values(shiftData).map((shift) => {
            return (
              <MenuItem key={shift.id} value={shift.id}>{`${shift.name}: ${shift.startDate} - ${shift.endDate}`}</MenuItem>
            );
          })}
        </Select>
      </FormControl>
      </Box>
  );
}

const SelectNurses = ({ setSelectedNurse }) => {
  const { nurseData } = useContext(AppState);
  const [nurse, setNurse] = useState(0);
  
  const handleChange = (event) => {
    setNurse(event.target.value);
    setSelectedNurse(event.target.value);
  };
  
  return (
    <Box sx={{m: 1, my: 2}}>
      <FormControl style={{minWidth: 525}}>
        <InputLabel id="nurse-label">Nurse</InputLabel>
        <Select
          labelId="nurse-select-label"
          id="nurse-select-id"
          value={nurse}
          label="Nurse"
          onChange={handleChange}
        >
          <MenuItem key={0} value={0}>Select Nurse</MenuItem>
          {Object.values(nurseData).map((nurse) => {
            return (
              <MenuItem key={nurse.id} value={nurse.id}>{`${nurse.first_name} ${nurse.last_name}, ${nurse.qualification}`}</MenuItem>
            );
            })}
        </Select>
      </FormControl>
    </Box>
  );
}

export { SelectShifts, SelectNurses };