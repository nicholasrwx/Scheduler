import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index.js";
import "components/Application.scss";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

// The main reason we are not storing the day state
// in the DayList is that we need to use that state
// with other components.
// We "lifted" the state up to the Application
// component.

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  useEffect(() => {
    // /api/appointments

    Promise.all([axios.get(`/api/days`), axios.get(`/api/appointments`)]).then(
      (all) => {
        const days = all[0].data;
        const appointments = all[1].data;
        const updatedState = { ...state, days, appointments };
        setState(updatedState);
      }
    );
  }, []);

  const setDay = (day) => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  let appointmentList = dailyAppointments.map((app) => {
    return <Appointment key={app.id} {...app} />;
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
