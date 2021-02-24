import React, { useState } from "react";
import { Months } from "../config/months";
import { ArrowDown } from "react-bootstrap-icons";
import axios from "axios";

export const EnterIncome = ({ previousMonth, currentOrPreviousYear, defaultIncome, getData }) => {

  const [ income, setIncome ] = useState(defaultIncome);
  const [ transferredZus, setTransferredZus ] = useState(true);
  const month = Months[ previousMonth ];

  const onChangeIncome = (event) => {
    setIncome(event.target.value);
  }

  const onChangeTransferredZus = (event) => {
    setTransferredZus(event.target.checked);
  }

  async function saveIncome(income) {
    try {
      return await axios.post('http://localhost:3500/api/save-data/income', {
        income,
        transferredZus,
        month: previousMonth,
        year: currentOrPreviousYear
      });
    } catch (error) {
      
      console.error("Error! saving income: ", error);
    }
  }

  const submitIncome = () => {
    saveIncome(income).then(response => {
      getData();
    });
  }

  return (
    <div className="card border-primary">
      <div className="card-header bg-dark text-light">
        Podaj dochód za: { month } { currentOrPreviousYear }
      </div>
      <div className="card-body">
        <div className="mb-3">
          {/* <label htmlFor="income" className="form-label">Dochód za: { month }, { currentOrPreviousYear } </label> */ }
          <input type="number" className="form-control" aria-describedby="income" id="income" name="income" onChange={ onChangeIncome } value={ income } />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" name="transferredZus" id="transferredZus" checked={ transferredZus ? "checked" : "" } onChange={ onChangeTransferredZus } />
          <label className="form-check-label" htmlFor="transferredZus">Opłacony ZUS</label>
        </div>
        <button className="btn btn-primary" onClick={ submitIncome }><ArrowDown size="17" /> Zapisz dochód ({ month })</button>
      </div>
    </div>
  );
};