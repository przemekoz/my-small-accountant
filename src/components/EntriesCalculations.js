import React from "react";
import { Calculations } from "./Calculations";
import { EntriesData } from "../data/entries";
import { Config } from "../config/config";
import { Gear, Save2 } from "react-bootstrap-icons";
import { Months } from "../config/months";

export const EntriesCalculations = (props) => {
  const { currentMonth, currentYear, previousYear } = props;
  const configTaxYear = Config.taxes.find(taxes => taxes.year === previousYear);

  const filteredEntries = EntriesData.filter(entry => {
    const yearCondition = currentMonth > 0 ? entry.year === currentYear : entry.year === previousYear;
    const monthCondition = currentMonth > 0 ? entry.month < currentMonth : true;
    return yearCondition && monthCondition;
  });

  return (
    <div className="card border-success">
      <div className="card-header">
        Lista opłat, obliczanie/zapisywanie podatku
      </div>
      <div className="card-body">
        <div className="container">
          <div className="row">
            <table className="table table-light table-striped">
              <thead>
                <tr>
                  <th scope="col">Data ({previousYear}r.)</th>
                  <th scope="col">ZUS</th>
                  <th scope="col">Podatek</th>
                  <th scope="col">Dochód</th>
                </tr>
              </thead>
              <tbody>
                { filteredEntries.map(entry => (
                  <tr key={ entry.year + entry.month }>
                    <th scope="row">{ Months[ entry.month ] }</th>
                    <td>{ entry.transferredZus ? configTaxYear.zus : 0 }</td>
                    <td>{ entry.transferredTax }</td>
                    <td>{ entry.income }</td>
                  </tr>
                )) }
              </tbody>
            </table>
          </div>
          <Calculations filteredEntries={ filteredEntries } previousYear={ previousYear } configTaxYear={ configTaxYear } />
          <div className="row">
            <button type="submit" className="btn btn-success"><Save2 size="17" /> Zapisz obliczony podatek</button>
          </div>
        </div>
      </div>
    </div>
  )
};