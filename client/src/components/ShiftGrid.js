import React, { useContext } from 'react';
import { AppState } from '../App.js';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';


const columns = [
  { field: 'name', headerName: 'Shift', width: 200 },
  { field: 'startDate', headerName: 'Start Time', width: 200 },
  { field: 'endDate', headerName: 'End Time', width: 200 },
  { field: 'qual_required', headerName: 'Certification Required', width: 200 },
  { field: 'nurseName', headerName: 'Nurse', width: 200 },
];

const ShiftGrid= () => {
  const { shiftData } = useContext(AppState);

  return (
      <Box style={{ height: 400, width: '80%' }}>
          <DataGrid
          rows={Object.values(shiftData)}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          />
    </Box>
  );
}

export default ShiftGrid;