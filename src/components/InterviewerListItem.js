import React from "react";
import classnames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const itemName = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  const imageName = classnames("interviewers__item-image", {
    "interviewers__item-image--selected": props.selected,
  });

  return (
    <li onClick={props.setInterviewer} className={itemName}>
      <img className={imageName} src={props.avatar} alt={props.name} />
      {props.selected && props.name}
    </li>
  );
}
