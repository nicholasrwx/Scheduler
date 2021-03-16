import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classnames("day-list__item", {
    "--selected": props.selected,
    "--full": props.spots === 0,
  });

  return (
    <li onClick={() => props.setDay(props.name)}>
      <h3 className={dayClass}>
        {props.name} <div>{props.spots}</div>
      </h3>
    </li>
  );
}
