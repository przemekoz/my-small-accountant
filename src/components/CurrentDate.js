import React from "react";
import { Months } from "../config/months";
import { EmojiSunglasses } from "react-bootstrap-icons";

export const CurrentDate = ({ currentMonth, currentYear, currentDate }) => {
  const transferIn = 20 - currentDate;
  return (
    <div className="card text-white bg-primary">
      <div className="card-header">
        Hola señor <EmojiSunglasses size="19" />
      </div>
      <div className="card-body text-center">
        <h3>{ currentDate } { Months[ currentMonth ] }, { currentYear }</h3>
        { transferIn > 0 && <small className="text-warning">Pamiętaj, że juz za: <strong>{ transferIn } { transferIn === 1 ? "dzień" : "dni" }</strong> mija termin opłaty podatku.</small> }
      </div>
    </div>
  );
};
