import React from "react";
import { Months } from "../config/months";

export const CurrentDate = (props) => {
  const { currentMonth, currentYear, currentDate } = props;
  const transferIn = 20 - currentDate;
  return (
    <>
      <small className="text-muted">Teraz jest</small>
      <h3>
        { currentDate } { Months[ currentMonth ] }, { currentYear }
      </h3>
      {transferIn > 0 && <small className="text-warning">Termin do zapłaty podatku jest za: {transferIn} dzień/dni</small>}
    </>
  );
};
