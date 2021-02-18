import './App.css';
import { CurrentDate } from './components/CurrentDate';
import { EnterIncome } from './components/EnterIncome';
import { EntriesCalculations } from './components/EntriesCalculations';
import { Config } from './config/config';
import { EntriesData } from './data/entries';
import { getPreviousMonthYear } from "./helpers";

function App() {
  const date = new Date();
  const currentDate = date.getDate();
  

  // const currentMonth = date.getMonth();
  //@todo TESTS
  const currentMonth = 4;


  const currentYear = date.getFullYear();
  const [ previousMonth, previousYear ] = getPreviousMonthYear(currentMonth, currentYear);

  const hasPraviousMonthIncome = () => {
    return EntriesData.find(entry => entry.month === previousMonth && entry.year === previousYear && entry.income > 0);
  }

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
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="logo.png" alt="logo" className="d-inline-block align-middle mr-2" />
            <strong>My Small Accountant</strong>
          </a>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col">
            <CurrentDate { ...propsCurrentMonthYear } currentDate={ currentDate } />
          </div>
          <div className="col">
            { !hasPraviousMonthIncome() && <EnterIncome { ...propsPreviousMonthYear } defaultIncome={ Config.defaultIncome } /> }
            { hasPraviousMonthIncome() && <EntriesCalculations { ...propsCurrentMonthYear } { ...propsPreviousMonthYear } /> }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
