import './App.css';
import { useEffect, useState } from "react";
import { uniqRndStr } from "./utils/rndMethods";
import calcDigitMatch from './utils/calcDigitMatch';
import Client from './components/Client';
import MyModal from './components/UI/modal/MyModal';
import ContainerAI from './components/ContainerAI';
import Input4D from './components/Input4D';

function App() {

  const [modal, setModal] = useState(true);

  const [myGuess, setMyGuess] = useState([]);
  const [myRes, setMyRes] = useState([]);
  const [opGuess, setOpGuess] = useState([]);
  const [opRes, setOpRes] = useState([]);
  const [isMyTurn, setIsMyTurn] = useState(null);
  const [myNumber, setMyNumber] = useState(null);
  const [myWin, setMyWin] = useState(null);

  useEffect( () => {
    if (myNumber) {
      setIsMyTurn(false)
      setModal(false);
    }
  }, [myNumber]);
  
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
    // if (isMyTurn) {
    if (true) {
      setMyGuess([]); setMyRes([]);
      setOpGuess([]); setOpRes([]);
      setIsMyTurn(null);
      setMyWin(null);
      setMyNumber(null);
      setModal(true);
    }
  }

////////////////////////////// RENDER /////////////////////////////
  return (
    <>
    <MyModal
      visible = { modal }
      setVisible = { setModal }
    >
      {/* <div>Set My Number</div> */}
      <Input4D 
        input={ uniqRndStr('0123456789') } 
        setInput={ (val) => setMyNumber(val.slice(-1)[0]) } 
        isMyTurn={ modal }/>
    </MyModal>

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
