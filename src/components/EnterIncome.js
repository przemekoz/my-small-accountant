import React, { useState } from "react";
import { Months } from "../config/months";

export const EnterIncome = (props) => {

  const { previousMonth, previousYear } = props;
  const [ income, setIncome ] = useState(props.defaultIncome);


  const onChangeIncome = (event) => {
    setIncome(event.target.value);
  }

  const submitIncome = () => {

  }

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="income" className="form-label">Podaj dochód za: { Months[ previousMonth ] }, { previousYear } </label>
        <input type="number" className="form-control" aria-describedby="income" id="income" name="income" onChange={ onChangeIncome } value={ income } />
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" name="transferedZus" id="transferedZus" />
        <label className="form-check-label" htmlFor="transferedZus">Opłacony ZUS</label>
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" name="transferedTax" id="transferedTax" />
        <label className="form-check-label" htmlFor="transferedTax">Opłacony podatek</label>
      </div>
      <button type="submit" className="btn btn-primary" onClick={ submitIncome }>Zapisz</button>
    </form>
  );
};