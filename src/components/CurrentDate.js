import React from "react";
import { Months } from "../config/months";

export const CurrentDate = (props) => {
  const date = new Date();
  return (
    <h3>
      {date.getDate()} { Months[ date.getMonth() ] }, { date.getFullYear() }
    </h3>
  );
};
