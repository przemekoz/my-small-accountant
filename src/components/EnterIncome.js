import React, { useState } from "react";
import { Months } from "../config/months";

export const EnterIncome = (props) => {

  const { date } = props;

  const [ income, setIncome ] = useState(props.defaultIncome);

  const onChangeIncome = (event) => {
    setIncome(event.target.value);
  }

  const submitIncome = () => {

  }

  const getPreviusMonth = () => {
    const currentMonth = date.getMonth();
    if ( currentMonth > 0 ) {
      return Months[ currentMonth - 1 ];
    }
    return "@todo grudzień poprzedni rok";
  }

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Podaj dochód za: {getPreviusMonth()} </label>
        <input type="number" className="form-control" aria-describedby="income" onChange={ onChangeIncome } value={income} />
      </div>
      <button type="submit" className="btn btn-primary" onClick={ submitIncome }>Zapisz</button>
    </form>
  );
};
