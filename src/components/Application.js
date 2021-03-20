import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index.js";
import "components/Application.scss";
import axios from "axios";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
} from "helpers/selectors";

//*********************************************************************//
// MANAGES THE DAYLIST NAV BAR AND APPOINTMENTS BASED ON CURRENT STATE //
//*********************************************************************//

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  console.log("INTERVIEWERS", state.interviewers);
  useEffect(() => {
    // /api/appointments

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

  const setDay = (day) => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const bookInterview = function (id, interview) {
    console.log(id, interview);
  }

  let appointmentList = dailyAppointments.map((app) => {
    console.log("APPOITNMENTS", app)
    
    return (
      <Appointment
        key={app.id}
        id={app.id}
        time={app.time}
        interview={app.interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            //days array
            days={state.days}
            //current or default day
            day={state.day}
            //setDay function used to update day && days
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />{" "}
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
