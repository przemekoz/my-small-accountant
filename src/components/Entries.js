import React from "react";
import { Months } from "../config/months";

export const Entries = (props) => {
  const { filteredEntries } = props;

  return (
    <table className="table table-light table-striped">
      <thead>
        <tr>
          <th scope="col">Data</th>
          <th scope="col">Opłacony ZUS</th>
          <th scope="col">Opłacony podatek</th>
          <th scope="col">Dochód</th>
        </tr>
      </thead>
      <tbody>
        { filteredEntries.map(entry => (
          <tr key={entry.year + entry.month}>
            <th scope="row">{ entry.year }, { Months[ entry.month ] }</th>
            <td>{ entry.transferredZus ? "TAK" : "NIE" }</td>
            <td>{ entry.transferredTax ? "TAK" : "NIE" }</td>
            <td>{ entry.income }</td>
          </tr>
        )) }
      </tbody>
    </table>
  );
};