import React, { useState } from "react";
import { Months } from "../config/months";
import { ArrowDown } from "react-bootstrap-icons";
import axios from "axios";
import { Spinner } from "./Spinner";

export const EnterIncome = ({ previousMonth, currentOrPreviousYear, defaultIncome }) => {

  const [ income, setIncome ] = useState(defaultIncome);
  const [ transferredZus, setTransferredZus ] = useState(true);
  const [ isProgress, setIsProgress ] = useState(false);
  const month = Months[ previousMonth ];

  const onChangeIncome = (event) => {
    setIncome(event.target.value);
  }

  const onChangeTransferredZus = (event) => {
    setTransferredZus(event.target.checked);
  }

  async function saveIncome(income) {
    setIsProgress(true);
    try {
      return await axios.post('http://localhost:3500/api/save-data/income', { income, transferredZus: transferredZus });
    } catch (error) {
      setIsProgress(false);
      console.error("Error! saving income: ", error);
    }
  }

  const submitIncome = () => {
    saveIncome(income).then(response => {
      setIsProgress(false);
    });
  }

  return (
    <div className="card border-primary">
      <div className="card-header bg-dark text-light">
        Podaj dochód za: { month } { currentOrPreviousYear }
      </div>
      <div className="card-body">
        <form>
          <div className="mb-3">
            {/* <label htmlFor="income" className="form-label">Dochód za: { month }, { currentOrPreviousYear } </label> */ }
            <input type="number" className="form-control" aria-describedby="income" id="income" name="income" onChange={ onChangeIncome } value={ income } />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" name="transferredZus" id="transferredZus" checked={transferredZus ? "checked" : ""} onChange={onChangeTransferredZus} />
            <label className="form-check-label" htmlFor="transferredZus">Opłacony ZUS</label>
          </div>
          <button className="btn btn-primary" onClick={ submitIncome }><ArrowDown size="17" /> Zapisz dochód ({ month }) { isProgress && <Spinner /> }</button>
        </form>
      </div>
    </div>
  );
};