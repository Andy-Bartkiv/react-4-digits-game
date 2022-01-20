import './App.css';
import { useEffect, useState } from "react";
import Client from './components/Client';

function App() {

  const [myGuess, setMyGuess] = useState([]);
  const [myRes, setMyRes] = useState([]);
  const [opGuess, setOpGuess] = useState([]);
  const [opRes, setOpRes] = useState([]);
  const [isMyTurn, setIsMyTurn] = useState(null);

  const myNumber = '2468';
  const opNumber = '0987';


  useEffect( () => {
    setTimeout(() => setIsMyTurn(true), 1500);
  },[])

  useEffect(() => setIsMyTurn(true), [opGuess]);

  useEffect(() => {
    if (myGuess.length) {
        setIsMyTurn(false);
      setTimeout(() => {
        const newRes = compareDigits(myGuess[myGuess.length-1], opNumber)
        setMyRes([...myRes, newRes]);
      }, 1000);
      setTimeout(() => {
        setOpGuess([...opGuess, myGuess[myGuess.length-1]])
        const newRes = compareDigits(myGuess[myGuess.length-1], myNumber)
        setOpRes([...opRes, newRes]);
      }, 2500);
    }
  console.log(myGuess, myRes, isMyTurn);
  }, [myGuess]);


  function compareDigits(str1, str2) {
    let res = [0, 0];
    for (let d of str2) {
      if (str1.indexOf(d) >= 0) res[0]++;
      if (str1.indexOf(d) === str2.indexOf(d)) res[1]++;
    }
    return res.join('');
  }
  console.log('app', myNumber, opNumber)

////////////////////////////// RENDER /////////////////////////////
  return (
    <Client
      isMyTurn= { isMyTurn }
      myGuess={ myGuess }
      setMyGuess={ setMyGuess }
      myRes={ myRes }
      opGuess={ opGuess }
      opRes={ opRes }
      myNumber= { myNumber }
    />
  );
}

export default App;
