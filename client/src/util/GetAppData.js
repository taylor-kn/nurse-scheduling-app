const getAppData = async () => {
    try {
        let nurseResponse = await fetch("/nurses");
        let nurses = await nurseResponse.json();
        let nurseObject;
        if(nurses.length > 0) {
          nurseObject = nurses.reduce((map, nurse) => {
            map[nurse.id] = {
              ...nurse,
              name_position: `${nurse.first_name} ${nurse.last_name}, ${nurse.qualification}`,
              shifts: [],
            };
            return map;
          }, {});
        }
        let shiftResponse = await fetch("/shifts");
        let shifts = await shiftResponse.json();

        let shiftObject;
        if (shifts.length > 0) {
          shiftObject = shifts.reduce((map, shift) => {
            map[shift.id] = {
              ...shift,
              startDate: new Date(shift.start).toLocaleString(),
              endDate: new Date(shift.end).toLocaleString(),
              nurseName: shift.nurse_id ? nurseObject[shift.nurse_id].name_position : null,
            };
            if(shift.nurse_id) {
              nurseObject[shift.nurse_id].shifts.push(shift.id);
            }
            return map;
          }, {});
        }
        let error = nurseResponse.status === 500 || shiftResponse.status === 500;
        return {
            loaded: true,
            error,
            shifts: error ? [] : shiftObject, 
            nurses: error ? [] : nurseObject,
        };

    } catch (error) {
        console.log(error);
        return {
            loaded: true,
            error: true,
            shifts: [], 
            nurses: []
        };
    }
}

export default getAppData;