import React, { useState } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index.js";
import "components/Application.scss";

// The main reason we are not storing the day state
// in the DayList is that we need to use that state
// with other components.
// We "lifted" the state up to the Application
// component.

export default function Application(props) {
  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];

  const appointments = [
    {
      id: 1,
      time: "12pm",
    },
    {
      id: 2,
      time: "1pm",
      interview: {
        student: "Lydia Miller-Jones",
        interviewer: {
          id: 1,
          name: "Sylvia Palmer",
          avatar: "https://i.imgur.com/LpaY82x.png",
        },
      },
    },
    {
      id: 3,
      time: "2pm",
    },
    {
      id: 4,
      time: "3pm",
    },
    {
      id: 5,
      time: "4pm",
      interview: {
        student: "Mr. Jones",
        interviewer: {
          id: 1,
          name: "Mildred Nazir",
          avatar: "https://i.imgur.com/T2WwVfS.png",
        },
      },
    },
  ];

  let appointmentList = appointments.map((app) => {
    return (
      <Appointment key={app.id} {...app} />
    );
  });

//time={app.time} interview={app.interview}

  const [day, setDay] = useState("Monday");

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
            days={days}
            //default day is set in usestate
            day={day}
            //setDay function used to update day that is destructured from useState
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
