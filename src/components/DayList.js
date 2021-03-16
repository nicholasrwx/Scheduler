import React from "react";
import DayListItem from "components/DayListItem";

export default function Daylist(props) {
  const DayList = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        //setDay is a prop outside of props.days, 
        //its not an item in the props.days array,
        //therefore it needs to be props.setDay
        //it can change because its managed by state
        setDay={props.setDay}
        spots={day.spots}
        selected={day.name === props.day}
      />
    );
  });

  return <ul>{DayList}</ul>;
}
