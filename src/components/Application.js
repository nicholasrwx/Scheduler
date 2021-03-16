import React, { useState } from "react";
import DayList from "components/DayList";
import "components/Application.scss";



// The main reason we are not storing the day state 
// in the DayList is that we need to use that state 
// with other components. 
// We "lifted" the state up to the Application 
// component.




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


export default function Application(props) {
  
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
/>      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
