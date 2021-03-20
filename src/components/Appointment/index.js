import React from "react";
import useVisualMode from "../../hooks/useVisualMode";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import "components/Appointment/styles.scss";

//APPOINTMENT COMPONENT

//************************************************************************//
//APPOINTMENT COMPONENT CREATES AND RETURNS THE JSX OF A PARTICULAR MODE  //
//BASED ON WHAT IS PASSED HERE BY THE APPLICATION COMPONENT               //
//************************************************************************//

export default function Appointment(props) {
  //MODE CONSTANTS
  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  }



  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => transition(EMPTY)}
        />
      )}
    </article>
  );
}
