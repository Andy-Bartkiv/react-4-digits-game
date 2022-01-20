import './App.css';
import { useEffect, useState } from "react";
import { uniqRndStr } from "./utils/rndMethods";
import calcDigitMatch from './utils/calcDigitMatch';
import Client from './components/Client';
import ContainerAI from './components/ContainerAI';

function App() {

  const [myGuess, setMyGuess] = useState([]);
  const [myRes, setMyRes] = useState([]);
  const [opGuess, setOpGuess] = useState([]);
  const [opRes, setOpRes] = useState([]);
  const [isMyTurn, setIsMyTurn] = useState(null);
  const [myNumber, setMyNumber] = useState(null);
  const [myWin, setMyWin] = useState(null);

  // Initial starting side Selection
  useEffect( () => {
    if (isMyTurn === null && myWin === null) 
      setTimeout( () => {
        setIsMyTurn(false)
        setMyNumber(uniqRndStr('0123456789'));
      }, 500);
  }, [isMyTurn]);
  
  useEffect(() => {
    if (myGuess.length) setIsMyTurn(false)
  }, [myGuess]);

  // CHECK WINING CONDITION 
  useEffect(() => {
    if (myRes.length && myRes.slice(-1)[0] === '44') {
      // setMyWin(true);
      // setIsMyTurn(null);
      console.log('You Win :)')
    }
  }, [myRes])

  useEffect(() => {
    if (opRes.length) setIsMyTurn(true);
    if (opRes.length && opRes.slice(-1)[0] === '44') {
      // setMyWin(false);
      // setIsMyTurn(null);
      console.log('You Loose :(')
    }
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
      setMyWin(null);
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
      // myWin= { myWin }
      // setMyWin= { setMyWin }
      // setIsMyTurn= { setIsMyTurn }
    />}
    </>
  );
}

export default App;
