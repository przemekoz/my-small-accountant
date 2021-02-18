import React, { useState } from "react";
import { Months } from "../config/months";
import { getPreviousMonthYear } from "../helpers";

export const EnterIncome = (props) => {

  const { currentMonth, currentYear } = props;
  const [ income, setIncome ] = useState(props.defaultIncome);
  const [ previousMonth, previousYear ] = getPreviousMonthYear(currentMonth, currentYear);

  const onChangeIncome = (event) => {
    setIncome(event.target.value);
  }

  const submitIncome = () => {

  }

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Podaj dochód za: { Months[ previousMonth ] }, { previousYear } </label>
        <input type="number" className="form-control" aria-describedby="income" onChange={ onChangeIncome } value={ income } />
      </div>
      <button type="submit" className="btn btn-primary" onClick={ submitIncome }>Zapisz</button>
    </form>
  );
};
