import './App.css';
import { CurrentDate } from './components/CurrentDate';
import { EnterIncome } from './components/EnterIncome';
import { Config } from './config/config';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row align-items-start">
          <div className="col">
            <CurrentDate />
          </div>
          <div className="col">
            <EnterIncome defaultIncome={ Config.defaultIncome } />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
