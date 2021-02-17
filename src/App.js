import './App.css';
import { EnterIncome } from './components/EnterIncome';
import { Config } from './config/config';

function App() {
  return (
    <div className="App">
      <div className="container-xl">
        <EnterIncome defaultIncome={Config.defaultIncome} />
      </div>
    </div>
  );
}

export default App;
