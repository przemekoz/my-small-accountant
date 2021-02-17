import React from "react";
import { Months } from "../config/months";

export const CurrentDate = (props) => {
  const { date } = props;
  return (
    <h3>
      { date.getDate() } { Months[ date.getMonth() ] }, { date.getFullYear() }
    </h3>
  );
};
