const validShift = (shift, nurseShifts) => {
    let [ shiftStart, shiftEnd ] = shift;
    for (const nurseShift of nurseShifts) {
        let [ nurseShiftStart, nurseShiftEnd ] = nurseShift;
        if((nurseShiftStart >= shiftStart && nurseShiftStart <= shiftEnd) || 
           (nurseShiftEnd >= shiftStart && nurseShiftEnd <= shiftEnd)) {
            return false;
        }
    }
    return true;
};

const validNurse = (nurseQual, shiftQual) => {
    if(!nurseQual) return true;
    if(nurseQual === 'CNA') {
        if (shiftQual !== 'CNA') return false;
    } else if (nurseQual === 'LPN') {
        if (shiftQual === 'RN') return false;
    } 
    return true;
};

export { validNurse, validShift };