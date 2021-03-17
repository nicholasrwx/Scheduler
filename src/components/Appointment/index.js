import React from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import "components/Appointment/styles.scss";


export default function Appointment(props) {
  {/* {mode === consts.EMPTY && (
        <Empty onAdd={() => transition(consts.CREATE)} />
      )}
      {mode === consts.CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={back} />
      )} */
      
      return (
        <article className="appointment">
  <Header time={props.time} />
 
 
  </article>
);

}