import './App.css';
import Header from './components/Header';
import Input from './components/Input';
import { useEffect, useState } from "react";

function App() {

  const [myGuess, setMyGuess] = useState([]);

  const NUMBER = '2468';
  console.log(myGuess);

  function compareDigits(str1, str2) {
    let res = [0, 0];
    for (let d of str2) {
      if (str1.indexOf(d) >= 0) res[0]++;
      if (str1.indexOf(d) === str2.indexOf(d)) res[1]++;
    }
    return res.join('');
  }

  // useEffect(() => {
  //   if (myGuess.length)
  //     compareDigits(myGuess[myGuess.length-1]) 
  // }, [myGuess])

  return (
    <div className="App">
      <Header/>

      <div className='App-navbar'>
        <li>Menu</li>
        <li>Game</li>
        <li>Hint</li>
      </div>

      <div className='App-output'>

        <div className='output-list'>
          <div style={{ textAlign: 'center' }}>{ NUMBER.split('').join('-') }</div>
          { myGuess.map((guess, i) => 
            <div key={ i }>{ guess } - { compareDigits(guess, NUMBER) }</div> 
          )}
        </div>

        <div className='output-list'>
          <div style={{ textAlign: 'center' }}>?-?-?-?</div>
          { myGuess.map((guess, i) => 
            <div key={ i }>{ ""+i+i+i+i }</div> 
          )}
        </div>
      </div>

      <Input input={ myGuess } setInput={ setMyGuess }/>

    </div>
  );
}

export default App;
