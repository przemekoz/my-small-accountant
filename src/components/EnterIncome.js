import React, { useState } from "react";
import { Months } from "../config/months";
import { ArrowUpRight } from "react-bootstrap-icons";

export const EnterIncome = (props) => {

  const { previousMonth, previousYear } = props;
  const [ income, setIncome ] = useState(props.defaultIncome);
  const month = Months[ previousMonth ];

  const onChangeIncome = (event) => {
    setIncome(event.target.value);
  }

  const submitIncome = () => {

  }

  return (
    <div className="card border-primary">
      <div className="card-header">
        Podaj dochód za: { month } { previousYear }
      </div>
      <div className="card-body">
        <form>
          <div className="mb-3">
            {/* <label htmlFor="income" className="form-label">Dochód za: { month }, { previousYear } </label> */ }
            <input type="number" className="form-control" aria-describedby="income" id="income" name="income" onChange={ onChangeIncome } value={ income } />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" name="transferedZus" id="transferedZus" />
            <label className="form-check-label" htmlFor="transferedZus">Opłacony ZUS</label>
          </div>
          <button type="submit" className="btn btn-primary" onClick={ submitIncome }><ArrowUpRight size="17" /> Zapisz dochód ({month})</button>
        </form>
      </div>
    </div>
  );
};