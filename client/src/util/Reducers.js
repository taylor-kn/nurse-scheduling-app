function nurseReducer(state, action) {
    switch (action.type) {
      case 'initializeData':
        return action.nurses;
      case 'updateShift':
        return {...state,
                [action.nurseId] : {...state[action.nurseId],
                                    shifts: [...state[action.nurseId].shifts, action.newShift],
                                    }
                }
      case 'deleteNurseFromShift':
        return {...state,
                [action.nurseId] : {...state[action.nurseId],
                                    shifts: [...state[action.nurseId].shifts.filter((shiftId) => shiftId !== action.shiftId)],
                }

        };
      default:
        throw new Error();
    }
};

const initializeNurseData = (nurses) => {
    return {
        type: 'initializeData', 
        nurses,
    }
};

const updateNurseShift = (nurseId, newShift) => {
    return {
        type: 'updateShift',
        nurseId,
        newShift,
    }
};

const deleteNurseFromShift = (nurseId, shiftId) => {
    return {
        type: 'deleteNurseFromShift',
        nurseId,
        shiftId
    }
};

function shiftReducer(state, action) {
    switch (action.type) {
        case 'initializeData':
        return action.shifts;
        case 'updateNurseOnShift':
        return {...state,
                [action.shiftId] : {...state[action.shiftId],
                                    nurse_id: action.nurseId,
                                    nurseName: action.nurseName,
                                    }
                }
        default:
        throw new Error();
    }
};

const initializeShiftData = (shifts) => {
    return {
        type: 'initializeData', 
        shifts,
    }
};

const updateShift = (shiftId, nurseId, nurseName) => {
    return {
        type: 'updateNurseOnShift',
        shiftId,
        nurseId,
        nurseName,
    }
};


export { nurseReducer, initializeNurseData, updateNurseShift, deleteNurseFromShift, shiftReducer, initializeShiftData, updateShift };