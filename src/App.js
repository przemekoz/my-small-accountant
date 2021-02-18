import './App.css';
import { Calculations } from './components/Calculations';
import { CurrentDate } from './components/CurrentDate';
import { EnterIncome } from './components/EnterIncome';
import { EntriesComponent } from './components/EntriesComponent';
import { Config } from './config/config';
// import logo from '../public/logo.png';

function App() {
  const date = new Date();
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
            <CurrentDate date={ date } />
          </div>
          <div className="col">
            <EnterIncome date={ date } defaultIncome={ Config.defaultIncome } />
            <EntriesComponent />
            <Calculations date={ date } />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
