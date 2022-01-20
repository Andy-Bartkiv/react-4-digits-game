import './App.css';
import { useEffect, useState } from "react";
import Client from './components/Client';
import ContainerAI from './components/ContainerAI';
import calcDigitMatch from './components/utils/calcDigitMatch';

function App() {

  const [myGuess, setMyGuess] = useState([]);
  const [myRes, setMyRes] = useState([]);
  const [opGuess, setOpGuess] = useState([]);
  const [opRes, setOpRes] = useState([]);
  const [isMyTurn, setIsMyTurn] = useState(null);

  const myNumber = '2468';
  // Initial starting side Selection
  useEffect( () => {
    if (isMyTurn === null) setTimeout(() => setIsMyTurn(false), 100);
  }, [isMyTurn]);
  
  useEffect(() => {
    if (myGuess.length) setIsMyTurn(false)
  }, [myGuess]);

  useEffect(() => {
    if (opRes.length) setIsMyTurn(true)
  }, [opRes]);

  useEffect(() => {
    if (opGuess.length) {
      setTimeout(() => {
        const newRes = calcDigitMatch(opGuess[opGuess.length-1], myNumber)
        setOpRes([...opRes, newRes]);
      }, 750);
     }
  }, [opGuess]);

  function restartGame() {
    if (isMyTurn) {
      setMyGuess([]); setMyRes([]);
      setOpGuess([]); setOpRes([]);
      setIsMyTurn(null);
    }
  }

////////////////////////////// RENDER /////////////////////////////
  return (
    <>
    <Client
      myNumber= { myNumber }
      myGuess={ myGuess }
      setMyGuess={ setMyGuess }
      myRes={ myRes }
      opGuess={ opGuess }
      opRes={ opRes }
      isMyTurn= { isMyTurn }
      restartGame= { restartGame }
    />
    
    {(isMyTurn!==null) && 
    <ContainerAI
      isMyTurn= { isMyTurn }
      myGuess={ myGuess }
      myRes={ myRes }
      setMyRes={ setMyRes }
      opGuess={ opGuess }
      setOpGuess={ setOpGuess }
      opRes={ opRes }
      // myNumber= { myNumber }
    />}
    </>
  );
}

export default App;
