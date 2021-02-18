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

  const [ previousMonth, previousYear ] = getPreviousMonthYear(currentMonth, currentYear);

  // const hasPraviousMonthIncome = () => {
  //   return EntriesData.find(entry => entry.month === previousMonth && entry.year === previousYear && entry.income > 0);
  // }

  const propsCurrentMonthYear = {
    currentMonth,
    currentYear
  };

  const propsPreviousMonthYear = {
    previousMonth,
    previousYear
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
            <EnterIncome { ...propsPreviousMonthYear } defaultIncome={ Config.defaultIncome } />
          </div>
          <div className="col">
            <EntriesCalculations { ...propsCurrentMonthYear } { ...propsPreviousMonthYear } />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
