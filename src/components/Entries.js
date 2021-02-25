import React from "react";
import { Months } from "../config/months";
import { Progressbar } from "./Progressbar";

export const Entries = ({ filteredEntries, currentOrPreviousYear, configTaxYear, incomes, countTransferedTax, isProgress }) => {
  return (
    <>
      <div className="card border-info">
        <div className="card-header bg-light text-dark">
          Lista opłat za rok: <strong>{ currentOrPreviousYear }</strong>
        </div>
        <div className="card-body">
          <Progressbar isVisible={isProgress} />
          <div className="container">
            <div className="row">
              <table className="table table-light table-striped">
                <thead>
                  <tr>
                    <th scope="col">Data</th>
                    <th scope="col">ZUS</th>
                    <th scope="col">Podatek</th>
                    <th scope="col">Dochód</th>
                  </tr>
                </thead>
                <tbody>
                  { filteredEntries.map(entry => (
                    <tr key={ entry.year + entry.month }>
                      <td>{ Months[ entry.month ] }</td>
                      <td>{ entry.transferredZus ? configTaxYear.zus : 0 }</td>
                      <td>{ entry.transferredTax }</td>
                      <td>{ entry.income }</td>
                    </tr>
                  )) }
                </tbody>
                <tfoot>
                  <tr>
                    <th className="border-top" colSpan="2">Łącznie:</th>
                    <th className="border-top" scope="row">{ countTransferedTax }</th>
                    <th className="border-top" scope="row">{ incomes }</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};