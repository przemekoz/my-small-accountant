import React from "react";
import { Months } from "../config/months";

export const CurrentDate = (props) => {
  const { currentMonth, currentYear, currentDate } = props;
  return (
    <h3>
      { currentDate } { Months[ currentMonth ] }, { currentYear }
    </h3>
  );
};
