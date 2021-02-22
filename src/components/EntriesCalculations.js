import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calculations } from "./Calculations";
import { Save2 } from "react-bootstrap-icons";
import { Months } from "../config/months";

export const EntriesCalculations = ({ currentMonth, currentYear, currentOrPreviousYear, configTaxYear }) => {

  const [ filteredEntries, setFilteredEntries ] = useState([]);

  async function getEntries() {
    try {
      return await axios.get('http://localhost:3500/api/entries');
    } catch (error) {
      console.error("Error! getting entries: ", error);
    }
  }

  const getData = () => {
    getEntries().then(response => {
      const filteredEntries = response.data.filter(entry => {
        const yearCondition = currentMonth > 0 ? entry.year === currentYear : entry.year === currentOrPreviousYear;
        const monthCondition = currentMonth > 0 ? entry.month < currentMonth : true;
        return yearCondition && monthCondition;
      });
      setFilteredEntries(filteredEntries);
    });
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <>
      <div className="card border-success">
        <div className="card-header bg-dark text-light">
          Lista opłat, obliczanie/zapisywanie podatku
      </div>
        <div className="card-body">
          <div className="container">
            <div className="row">
              <table className="table table-light table-striped">
                <thead>
                  <tr>
                    <th scope="col">Data ({ currentOrPreviousYear }r.)</th>
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
            <Calculations filteredEntries={ filteredEntries } currentOrPreviousYear={ currentOrPreviousYear } configTaxYear={ configTaxYear } getData={ getData } />
            <div className="row">
              <button type="submit" className="btn btn-success"><Save2 size="17" /> Zapisz obliczony podatek</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};