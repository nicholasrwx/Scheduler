import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";




export default function Form(props) {
  const [error, setError] = useState("");
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = function () {
    setName("");
    setInterviewer(null);
  };

  const cancel = function () {
    reset();
    props.onCancel();
  };

  function validate() {
    
    
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError(null)
    props.onSave(name, interviewer);
  }



  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            type="text"
            placeholder="Enter Student Name"
            //managed with useState
            value={name}
            onChange={(event) => setName(event.target.value)}
            /*
          This must be a controlled component
        */
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          //interviewer array
          interviewers={props.interviewers}
          //managed with useState
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={ () => validate() }>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
