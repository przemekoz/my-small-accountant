import React, { useState } from "react";
import { Months } from "../config/months";
import { ArrowClockwise, Save, Save2 } from "react-bootstrap-icons";
import { Calculations } from "./Calculations";
import { Http } from "../helpers/http";

export const EnterIncome = ({ previousMonth, currentOrPreviousYear, defaultIncome, getData, filteredEntries, configTaxYear, incomes, countTransferedTax, setIsProgress }) => {

  const [ tax, setTax ] = useState(defaultIncome);
  const [ income, setIncome ] = useState(defaultIncome);
  const [ transferredZus, setTransferredZus ] = useState(true);
  const month = Months[ previousMonth ];

  const refreshData = () => {
    setIsProgress(true);
    setTimeout(() => {
      getData();
    }, 1000)
  };

  const handleRefreshClick = () => {
    setIsProgress(true);
    getData();
  };

  const onChangeIncome = (event) => {
    setIncome(event.target.value);
  };

  const onChangeTransferredZus = (event) => {
    event.persist();
    setTransferredZus(event.target.checked);
  };

  async function saveIncome(income) {
    try {
      return await Http.post('api/save-data/income', {
        income,
        transferredZus,
        month: previousMonth,
        year: currentOrPreviousYear
      });
    } catch (error) {
      console.error("Error! saving income: ", error);
    }
  };

  const submitIncome = () => {
    saveIncome(income).then(refreshData);
  };

  async function saveTax(transferredTax) {
    try {
      return await Http.post('api/save-data/tax', {
        transferredTax,
        month: previousMonth,
        year: currentOrPreviousYear
      });
    } catch (error) {
      console.error("Error! saving tax: ", error);
    }
  };

  const submitTax = () => {
    saveTax(tax).then(refreshData);
  };

  return (
    <div className="card border-primary">
      <div className="card-header bg-dark text-light">
        Rozliczenie za: <strong>{ month } { currentOrPreviousYear }</strong>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="income" className="form-label">Dochód</label>
          <input type="number" className="form-control" aria-describedby="income" id="income" name="income" onChange={ onChangeIncome } value={ income } />
        </div>
        <div className="mb-3">
          <label htmlFor="tax" className="form-label">Podatek <small className="text-muted">obliczany na podstawie dochodu</small></label>
          <input type="number" className="form-control" aria-describedby="tax" id="tax" name="tax" value={ tax } disabled />
          <small className="mr-3 text-muted">
            <Calculations
              filteredEntries={ filteredEntries }
              currentOrPreviousYear={ currentOrPreviousYear }
              configTaxYear={ configTaxYear }
              setTax={ setTax }
              incomes={ incomes }
              countTransferedTax={ countTransferedTax }
            />
          </small>
          <button type="submit" onClick={ handleRefreshClick } className="btn btn-outline-light btn-sm"><ArrowClockwise size="16" color="primary" /></button>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" name="transferredZus" id="transferredZus" checked={ transferredZus ? "checked" : "" } onChange={ onChangeTransferredZus } />
          <label className="form-check-label" htmlFor="transferredZus">Opłacony ZUS</label>
        </div>
        <button className="btn btn-outline-primary mr-3" onClick={ submitIncome }><Save size="17" className="mr-1" />Zapisz dochód</button>
        <button type="submit" className="btn btn-outline-secondary" onClick={ submitTax } ><Save2 size="17" className="mr-1" />Zapisz podatek</button>
      </div>
    </div>
  );
};