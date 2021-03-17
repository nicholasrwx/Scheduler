import React from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";


import "components/Appointment/styles.scss";
//we do not need the styles imported into Header/Show/Empty as 
//Because the styles will be able to access the DOM elements 
//simply because these components are imported here
//The styles are then able to automatically access the
//Dom elements through the JSX Tags

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      ) : (
        <Empty onAdd={props.onAdd} />
      )}
    </article>
  );
}
