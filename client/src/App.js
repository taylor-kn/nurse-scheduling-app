import React, { useState, useEffect, useReducer } from 'react';
import ShiftGrid from './components/ShiftGrid.js';
import getAppData from './util/GetAppData.js';
import { Alert } from '@mui/material';
import ShiftAssignmentForm from './components/ShiftAssignmentForm.js';
import Box from '@mui/material/Box';
import { nurseReducer, shiftReducer, initializeNurseData, initializeShiftData } from './util/Reducers.js';

export const AppState = React.createContext({});

function App() {
  const [nurseData, nurseDispatch] = useReducer(nurseReducer, {});
  const [shiftData, shiftDispatch] = useReducer(shiftReducer, {});
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      let {loaded, error, shifts, nurses} = await getAppData();
      nurseDispatch(initializeNurseData(nurses));
      shiftDispatch(initializeShiftData(shifts));
      setLoaded(loaded);
      setError(error);
    }
    loadInitialData();
  }, []);

  return (
    <AppState.Provider value={{nurseData, shiftData, nurseDispatch, shiftDispatch}}>
      <Box sx={{m: 2, display: 'flex', flexDirection: 'column'}}>
        <h2>Nurse Schedule</h2>
        <ShiftAssignmentForm />
        <Box sx={{width: '80%'}}>
          {loaded && error && <Alert severity="warning">The data did not load, please refresh the page.</Alert>}
        </Box>
        <ShiftGrid />
      </Box>
    </AppState.Provider>
  );
}

export default App;