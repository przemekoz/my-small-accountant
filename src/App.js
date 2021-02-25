import React, { useEffect, useState } from "react";
import { CurrentDate } from './components/CurrentDate';
import { EnterIncome } from './components/EnterIncome';
import { Entries } from './components/Entries';
import { Config } from './config/config';
import { getIncomes, getPreviousMonthYear, getTransferredTax } from "./helpers";
import { Calculator } from "react-bootstrap-icons";
import { Http } from "./helpers/http";

function App() {
  const date = new Date();
  const currentDate = date.getDate();

  // const currentMonth = date.getMonth();
  // const currentYear = date.getFullYear();
  //@todo TESTS
  const currentMonth = 0;
  const currentYear = 2023;


  const [ filteredEntries, setFilteredEntries ] = useState([]);
  const [ isProgress, setIsProgress ] = useState(false);

  async function getEntries() {
    try {
      return await Http.get('api/entries');
    } catch (error) {
      console.error("Error! getting entries: ", error);
    }
  }

  const getData = () => {
    console.log("getData")
    getEntries().then(response => {
      setIsProgress(false);
      const filteredEntries = response.data.filter(entry => {
        const yearCondition = currentMonth > 0 ? entry.year === currentYear : entry.year === currentOrPreviousYear;
        const monthCondition = currentMonth > 0 ? entry.month < currentMonth : true;
        return yearCondition && monthCondition;
      });
      setFilteredEntries(filteredEntries);
    });
  }

  const [ previousMonth, currentOrPreviousYear ] = getPreviousMonthYear(currentMonth, currentYear);
  const configTaxYear = Config.taxes.find(taxes => taxes.year === currentOrPreviousYear);

  const propsCurrentMonthYear = {
    currentMonth,
    currentYear
  };

  const propsPreviousMonthYear = {
    previousMonth,
    currentOrPreviousYear
  };

  const incomes = getIncomes(filteredEntries);
  const countTransferedTax = getTransferredTax(filteredEntries);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light mb-5">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <Calculator size="35" className="d-inline-block align-middle mr-2" />
            <strong>My Small Accountant</strong>
          </a>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="mb-4">
              <CurrentDate { ...propsCurrentMonthYear } currentDate={ currentDate } />
            </div>
            <div className="card border-info mb-4">
              <div className="card-header bg-light text-dark">
                Składki za rok: <strong>{ currentOrPreviousYear }</strong>
              </div>
              <div className="card-body">
                <table className="table table-light table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Pełna</th>
                      <th scope="col">Emerytalna</th>
                      <th scope="col">Społeczne</th>
                      <th scope="col">Zdr. 9%</th>
                      <th scope="col">Zdr. 7.75%</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">{ configTaxYear.zus }</th>
                      <td>{ configTaxYear.zusEmer }</td>
                      <td>{ configTaxYear.zusSpl }</td>
                      <td>{ configTaxYear.zusZdr9 }</td>
                      <td>{ configTaxYear.zusZdr }</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mb-4">
              <EnterIncome { ...propsPreviousMonthYear } defaultIncome={ Config.defaultIncome } getData={ getData } configTaxYear={ configTaxYear } filteredEntries={ filteredEntries } countTransferedTax={ countTransferedTax } incomes={ incomes } setIsProgress={setIsProgress} />
            </div>
          </div>
          <div className="col">
            <Entries { ...propsPreviousMonthYear } configTaxYear={ configTaxYear } filteredEntries={ filteredEntries } countTransferedTax={ countTransferedTax } incomes={ incomes } isProgress={isProgress} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
