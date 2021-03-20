export function getAppointmentsForDay(state, day) {
  let result = [];

  //RETURNS EMPTY ARRAY, IF EMPTY STATE
  if (state.days.length === 0) {
    return [];
  }
  //SEARCHES FOR PARTICULAR DAY
  const daysArray = state.days.filter((stateDay) => stateDay.name === day);

  //RETURNS EMPTY IF DAY WASN'T FOUND
  if (daysArray.length === 0) {
    return [];
  }

  //FIND APPOINTMENTS FOR DAY
  for (let id of daysArray[0].appointments) {
    result.push(state.appointments[id]);
  }

  return result;
}

export function getInterviewersForDay(state, day) {
  let result = [];

  //IF THERE IS NO DAYS DATA FOUND
  if (state.days.length === 0) {
    return [];
  }

  const daysArray = state.days.filter((stateDay) => stateDay.name === day);

  //IF THE DAY DOESN"T EXIST
  if (daysArray.length === 0) {
    return [];
  }

  //CHECK FOR EVERY INTERVIEWER WITH AN ID THAT MATCHES THE SELECTED DAYS ID
  //CREATE AN ARRAY WITH THE RESULT

  for (let id of daysArray[0].interviewers) {
    if (state.interviewers.hasOwnProperty(id)) {
      result.push(state.interviewers[id.toString()]);
    }
  }

  return result;
}
