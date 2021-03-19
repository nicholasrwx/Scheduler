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
