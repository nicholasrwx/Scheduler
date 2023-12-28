import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  //STATE OBJECT WITH DEFAULT VALUE
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      const updatedState = { ...state, days, appointments, interviewers };
      setState(updatedState);
    });
  }, []);

  const updateSpots = function (day, days, appointments) {
    //Find current day, pass it to day Obj
    const dayObj = days.find((item) => item.name === day);

    //grab the appointments array for the day
    const appointmentIDs = dayObj.appointments;
    let spots = 0;
    //cycle through the appointments associated with the day
    for (const id of appointmentIDs) {
      const appointment = appointments[id];
      //if the appointment is null, count the empty appointment spot
      if (!appointment.interview) {
        spots++;
      }
    }

    //create a new day object with updated spots
    const newDayObj = { ...dayObj, spots };
    //find the day in the days array, update it with the new dayobject
    const newArray = days.map((item) => (item.name === day ? newDayObj : item));
    //return this new days array
    return newArray;
  };

  //UPDATES DAY IN STATE

  const setDay = (day) => setState({ ...state, day });

  //REGISTER APPOINTMENT
  const bookInterview = function (id, interview) {
    //CREATE A NEW STATE APPOINTMENT
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    //CREATE A NEW STATE APPOINTMENTS OBJECT WITH THE NEW APPOINTMENT
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    //UPDATE THE DATABASE WITH THE INTERVIEW
    //UPDATE THE LOCAL STATE WITH APPOINTMENTS OBJECT
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        //calculate spots in updateSpots, create a new days Array, and update state with it
        let days = updateSpots(state.day, state.days, appointments);
        setState((prev) => ({ ...prev, appointments, days }));
      });
  };

  //CANCEL APPOINTMENT
  const cancelling = function (id) {
    const interview = null;


    const appointment = {
      ...state.appointments[id],
      interview: interview,
    };


    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        let days = updateSpots(state.day, state.days, appointments);
        setState((prev) => ({ ...prev, appointments, days }));
      });
  };

  return { state, setDay, bookInterview, cancelling };
}
