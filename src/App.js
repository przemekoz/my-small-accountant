import './App.css';
import { Calculations } from './components/Calculations';
import { CurrentDate } from './components/CurrentDate';
import { EnterIncome } from './components/EnterIncome';
import { EntriesComponent } from './components/EntriesComponent';
import { Config } from './config/config';
import { Entries } from './data/entries';
import { getPreviousMonthYear } from "./helpers";

function App() {
  const date = new Date();
  const currentDate = date.getDate();
  

  // const currentMonth = date.getMonth();
  //@todo TESTS
  const currentMonth = 5;


  const currentYear = date.getFullYear();
  const [ previousMonth, previousYear ] = getPreviousMonthYear(currentMonth, currentYear);

  const hasPraviousMonthIncome = () => {
    return Entries.find(entry => entry.month === previousMonth && entry.year === previousYear && entry.income > 0);
  }

  const propsCurrentMonthYear = {
    currentMonth,
    currentYear
  };

  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="logo.png" alt="logo" className="d-inline-block align-middle mr-2" />
            <strong>My Small Accountant</strong>
          </a>
        </div>
      </nav>
      <div className="container">
        <div className="row align-items-start">
          <div className="col">
            <CurrentDate { ...propsCurrentMonthYear } currentDate={ currentDate } />
          </div>
          <div className="col">
            { !hasPraviousMonthIncome() && <EnterIncome { ...propsCurrentMonthYear } defaultIncome={ Config.defaultIncome } /> }
            { hasPraviousMonthIncome() && <EntriesCalculations { ...propsCurrentMonthYear } /> }
          </div>
        </div>
      </div>
    </div>
  );
}

const EntriesCalculations = (propsCurrentMonthYear) => {
  return (
    <>
      <EntriesComponent />
      <Calculations { ...propsCurrentMonthYear } />
    </>
  )
};

export default App;
