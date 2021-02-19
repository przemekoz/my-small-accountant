import { CurrentDate } from './components/CurrentDate';
import { EnterIncome } from './components/EnterIncome';
import { EntriesCalculations } from './components/EntriesCalculations';
import { Config } from './config/config';
// import { EntriesData } from './data/entries';
import { getPreviousMonthYear } from "./helpers";
import { Calculator } from "react-bootstrap-icons";

function App() {
  const date = new Date();
  const currentDate = date.getDate();

  // const currentMonth = date.getMonth();
  // const currentYear = date.getFullYear();
  //@todo TESTS
  const currentMonth = 4;
  const currentYear = 2021;

  const [ previousMonth, currentOrPreviousYear ] = getPreviousMonthYear(currentMonth, currentYear);
  const configTaxYear = Config.taxes.find(taxes => taxes.year === currentOrPreviousYear);

  // const hasPraviousMonthIncome = () => {
  //   return EntriesData.find(entry => entry.month === previousMonth && entry.year === currentOrPreviousYear && entry.income > 0);
  // }

  const propsCurrentMonthYear = {
    currentMonth,
    currentYear
  };

  const propsPreviousMonthYear = {
    previousMonth,
    currentOrPreviousYear
  };

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
            <div className="card border-info">
              <div className="card-header bg-dark text-light">
                Składki za rok: { currentOrPreviousYear }
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
          </div>
          <div className="col">
          <div className="mb-4">
              <EnterIncome { ...propsPreviousMonthYear } defaultIncome={ Config.defaultIncome } />
            </div>
            <EntriesCalculations { ...propsCurrentMonthYear } { ...propsPreviousMonthYear } configTaxYear={ configTaxYear } />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
