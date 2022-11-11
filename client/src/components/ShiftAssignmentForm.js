import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { SelectShifts, SelectNurses } from './SelectElements.js';
import Box from '@mui/material/Box';
import { AppState } from '../App.js';
import { updateShift, updateNurseShift } from '../util/Reducers.js';
import { validNurse, validShift } from '../util/ValidAssignmentHelpers.js';
import { Alert } from '@mui/material';


const ShiftAssignmentForm = () => {
    const { nurseData, shiftData, nurseDispatch, shiftDispatch } = useContext(AppState);
    const [showForm, setShowForm] = useState(false);
    const [selectedShift, setSelectedShift] = useState(null);
    const [selectedNurse, setSelectedNurse] = useState(null);
    const [nurseQualified, setNurseQualified] = useState(true);
    const [shiftQualified, setShiftQualified] = useState(true);

    const handleClose = () => {
        setShowForm(false);
        setNurseQualified(true);
        setShiftQualified(true);
        setSelectedShift(null);
        setSelectedNurse(null);
    };
    const saveAssignment = () => {
        let nurseShiftsTimes = selectedNurse ? nurseData[selectedNurse].shifts.map((shiftIdx) => [shiftData[shiftIdx].start, shiftData[shiftIdx].end]) : [];
        let shiftTime = [shiftData[selectedShift].start, shiftData[selectedShift].end];
        let nurseQualifies = validNurse(nurseData[selectedNurse]?.qualification, shiftData[selectedShift]?.qual_required );
        let shiftQualifies = validShift(shiftTime, nurseShiftsTimes);
        if(nurseQualifies && shiftQualifies) {
            if(selectedNurse) nurseDispatch(updateNurseShift(selectedNurse, selectedShift));
            shiftDispatch(updateShift(selectedShift, selectedNurse, nurseData[selectedNurse]?.name_position));
            setNurseQualified(true);
            handleClose();
        } else {
            if(!nurseQualifies) setNurseQualified(false);
            if(!shiftQualifies) setShiftQualified(false);
        }

    };
    return (
        <Box sx={{mb: 2}}>
            <Button 
                variant="contained"
                onClick={() => setShowForm(true)}>
                    Set Shift Assignment
            </Button>
            <Dialog 
                open={showForm}
                fullWidth={true}
                maxWidth={"sm"}
                onClose={() => handleClose()}>
                <DialogTitle sx={{m: 1}}>Set Shift Assignment</DialogTitle>
                <DialogContent>
                    <SelectShifts setSelectedShift={setSelectedShift} />
                    <SelectNurses setSelectedNurse={setSelectedNurse} />
                    {!nurseQualified && <Alert severity="warning" sx={{m: 1, width: '90%'}}>The nurse isn't qualified to work the chosen shift.</Alert>}
                    {!shiftQualified && <Alert severity="warning" sx={{m: 1, width: '90%'}}>The nurse is already working during the chosen shift.</Alert>}
                    <Button 
                        variant="contained"
                        disabled={!selectedShift}
                        onClick={() => saveAssignment()}
                        sx={{m: 1}}>
                            Save Assignment
                    </Button>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default ShiftAssignmentForm;