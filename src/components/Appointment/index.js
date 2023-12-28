import React from "react";
import useVisualMode from "../../hooks/useVisualMode";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
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
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //PASSED to FORM function, and captures Name and Interviewer
  //bookInterview function is passed here from application

  function onSave(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    if (interview.interviewer && interview.student) {
      transition(SAVING);

      props
        .bookInterview(props.id, interview)
        .then(() => {
          transition(SHOW);
        })
        .catch(() => transition(ERROR_SAVE, true));
    }
  }

  function onDelete() {
    transition(DELETING, true);

    props
      .cancelling(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={onSave}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer}
          onSave={onSave}
          onCancel={back}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={onDelete}
          onCancel={back}
          message="Would you like to Delete the Appointment?"
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_SAVE && (
        <Error
          message="Error! Cannot Register Appointment!"
          onCancel={() => transition(CREATE, true)}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Error! Cannot Remove Appointment!"
          onCancel={() => transition(SHOW, true)}
        />
      )}
    </article>
  );
}
