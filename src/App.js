import './App.css';
import { useEffect, useState } from "react";
import { uniqRndStr } from "./utils/rndMethods";
import calcDigitMatch from './utils/calcDigitMatch';
import Client from './components/Client';
import MyModal from './components/UI/modal/MyModal';
import ContainerAI from './components/ContainerAI';
import Input4D from './components/Input4D';
import SecretSelectText from './components/SecretSelectText';

function App() {

  const [modal, setModal] = useState(true);

  const [myGuess, setMyGuess] = useState([]);
  const [myRes, setMyRes] = useState([]);
  const [opGuess, setOpGuess] = useState([]);
  const [opRes, setOpRes] = useState([]);
  const [isMyTurn, setIsMyTurn] = useState(null);
  const [mySecret, setMySecret] = useState(null);
  const [myWin, setMyWin] = useState(null); // null

  useEffect( () => {
    if (mySecret) {
      setIsMyTurn(false)
      setModal(false);
    }
  }, [mySecret]);
  
  useEffect(() => {
    if (myGuess.length) setIsMyTurn(false)
  }, [myGuess]);

  // CHECK WINING CONDITION 
  useEffect(() => {
    if (myRes.length && myRes.slice(-1)[0] === '44') {
      setMyWin(true);
    } else if (myRes.length && myRes.length >= 12) {
      setMyWin(false);
    }
  }, [myRes])

  useEffect(() => {
    if (opRes.length) setIsMyTurn(true);
    if (opRes.length && opRes.slice(-1)[0] === '44') {
      setMyWin(false);
    } else if (opRes.length && opRes.length >= 12) {
      setMyWin(true);
    }
  }, [opRes]);

  useEffect(() => {
    if (opGuess.length) {
      setTimeout(() => {
        const newRes = calcDigitMatch(opGuess[opGuess.length-1], mySecret)
        setOpRes([...opRes, newRes]);
      }, 75); // 750
     }
  }, [opGuess]);

  function restartGame() {
    // if (isMyTurn) {  // BUG - you can not restart game after winning
    if (true) {
      setMyGuess([]); setMyRes([]);
      setOpGuess([]); setOpRes([]);
      setIsMyTurn(null);
      setMyWin(null);
      setMySecret(null);
      setModal(true);
    }
  }

////////////////////////////// RENDER /////////////////////////////
  return (
    <>
    <MyModal
      visible = { modal }
      // setVisible = { setModal }
    >
      <SecretSelectText/>
      
      <Input4D 
        input={ uniqRndStr('0123456789') } 
        setInput={ (val) => setMySecret(val.slice(-1)[0]) } 
        uniqDigits={ true }
        isMyTurn={ modal }/>
    </MyModal>

    <Client
      mySecret= { mySecret }
      myGuess={ myGuess }
      setMyGuess={ setMyGuess }
      myRes={ myRes }
      opGuess={ opGuess }
      opRes={ opRes }
      isMyTurn= { isMyTurn }
      restartGame= { restartGame }
      myWin= { myWin }
      setMyWin= { setMyWin }
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
