import React from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index.js";
import useApplicationData from "../hooks/useApplicationData";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "helpers/selectors";
import "components/Application.scss";

//*********************************************************************//
// MANAGES THE DAYLIST NAV BAR AND APPOINTMENTS BASED ON CURRENT STATE //
// Which is passed down through useApplication Data()                  //
//*********************************************************************//

export default function Application(props) {
  const { state, setDay, bookInterview, cancelling } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  let appointmentList = dailyAppointments.map((app) => {
    const interview = getInterview(state, app.interview);
    console.log("APPOITNMENTS", app);
    return (
      <Appointment
        key={app.id}
        id={app.id}
        time={app.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelling={cancelling}
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
