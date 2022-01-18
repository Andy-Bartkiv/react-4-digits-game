import './App.css';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header/>

      <div className='App-navbar'>
        <li>Menu</li>
        <li>Game</li>
        <li>Hint</li>
      </div>

      <div className='App-output'>
        <div className='output-list'>-1-2-3-4-___-4-4-</div>
        <div className='output-list'>-1-2-3-4-___-4-4-</div>
      </div>

      <div className='App-input'>
        <div>Submit</div>
        <div>-1-2-3-4-</div>
      </div>
    </div>
  );
}

export default App;
