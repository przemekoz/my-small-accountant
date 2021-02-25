import React from "react";
import { Months } from "../config/months";
import { Progressbar } from "./Progressbar";
import { ExclamationTriangle } from "react-bootstrap-icons";

const FIELDS = {
  income: "income",
  transferredTax: "transferredTax",
};

export const Entries = ({ filteredEntries, previousMonth, currentOrPreviousYear, configTaxYear, incomes, countTransferedTax, isProgress }) => {

  const previusMonthEntryId = parseInt(`${ currentOrPreviousYear }${ previousMonth }`, 10);

  const isPreviousMonth = () => {
    return filteredEntries.find(entry => entry.id === previusMonthEntryId);
  };

  const hasPreviousMonthData = (field) => {
    return filteredEntries.find(entry => entry.id === previusMonthEntryId && entry[ field ] > 0);
  };

  const getClasses = (entryId, fieldName) => {
    if (entryId !== previusMonthEntryId) {
      return "";
    }
    return hasPreviousMonthData(fieldName) ? "text-success font-weight-bold" : "bg-warning text-white font-weight-bold";
  }

  return (
    <>
      <div className="card border-primary">
        <div className="card-header bg-light text-dark">
          Lista opłat za rok: <strong>{ currentOrPreviousYear }</strong>
        </div>
        <div className="card-body">
          <Progressbar isVisible={ isProgress } />
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
                    <tr key={ entry.id }>
                      <td>{ Months[ entry.month ] }</td>
                      <td>{ entry.transferredZus ? configTaxYear.zus : 0 }</td>
                      <td className={ getClasses(entry.id, FIELDS.transferredTax) }>{ entry.transferredTax }</td>
                      <td className={ getClasses(entry.id, FIELDS.income) }>{ entry.income }</td>
                    </tr>
                  )) }
                  { !isPreviousMonth() && <WarningEmptyMonth previousMonth={ previousMonth } /> }
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

const WarningEmptyMonth = ({ previousMonth }) => (
  <>
    <tr>
      <td className="bg-warning text-white" colSpan="4"><ExclamationTriangle size="17" className="mr-1" />{ Months[ previousMonth ] } dane nie wypełnione!</td>
    </tr>
  </>
)