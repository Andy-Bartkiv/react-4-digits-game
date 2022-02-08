import './App.css';
import { useEffect, useState } from "react";
import { uniqRndStr } from "./utils/rndMethods";
import calcDigitMatch from './utils/calcDigitMatch';
import Client from './components/Client';
import ContainerAI from './components/ContainerAI';
// import Input4D from './components/Input4D';
// import SecretSelectText from './components/SecretSelectText';
// import SecretSelectRules from './components/SecretSelectRules';
import SecretSelect from './components/SecretSelect';
import MainMenu from './components/MainMenu';

function App() {

  const [showMainMenu, setShowMainMenu] = useState(false);
  const [showSecretSelect, setShowSecretSelect] = useState(true);
  const [keyClient, setKeyClient] = useState(Date.now());

  
  const timerLimit = 10;  // Fix bug at 5 sec
  const [timers, setTimers] = useState({ my: timerLimit, opp: timerLimit });
  const [myGuess, setMyGuess] = useState([]);
  const [myRes, setMyRes] = useState([]);
  const [opGuess, setOpGuess] = useState([]);
  const [opRes, setOpRes] = useState([]);
  const [isMyTurn, setIsMyTurn] = useState(null);
  const [mySecret, setMySecret] = useState(null);
  const [myWin, setMyWin] = useState(null); // null
  const [msgArr, setMsgArr] = useState([]);

  useEffect(() => {
    if (showMainMenu) {
      restartGame();
    } 
  }, [showMainMenu])

  useEffect( () => {
    if (mySecret) {
      // Random starting player: false = OPP, true = ME
      setIsMyTurn([false, true][Math.floor(Math.random() * 2)]);
      setShowSecretSelect(false);
      setTimers({ my: timerLimit, opp: timerLimit });
    }
  }, [mySecret]);

  useEffect(() => {
    if (myGuess.length) setIsMyTurn(false)
  }, [myGuess]);

  // CHECK WINNING CONDITION 
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
    if (timers.my === 0) setMyWin(false);
    if (timers.opp === 0) setMyWin(true);
  }, [timers]);

  useEffect(() => {
    if (myWin !== null) setIsMyTurn(null);
  }, [myWin]);

  useEffect(() => {
    if (opGuess.length) {
      setTimeout(() => {
        const newRes = calcDigitMatch(opGuess[opGuess.length-1], mySecret)
        setOpRes([...opRes, newRes]);
      }, 500); // 750
     }
  }, [opGuess]);

  function restartGame() {
    // if (isMyTurn) {  // BUG - you can not restart game after winning
    if (true) {
      setMyGuess([]); setMyRes([]);
      setOpGuess([]); setOpRes([]);
      setIsMyTurn(null);
      setMySecret(null);
      setShowSecretSelect(true);
      setMsgArr([]);
      setTimeout( () => {
        setMyWin(null)
        setTimers({ my: timerLimit, opp: timerLimit });
        setKeyClient(Date.now());
      }, 500);
    }
  }

////////////////////////////// RENDER /////////////////////////////
  return (
    <>
    {
    (showMainMenu)
      ? <MainMenu closeMM={ () => setShowMainMenu(false) }/>
      : 
        <>
          <SecretSelect
            visible={ showSecretSelect }
            input={ uniqRndStr('0123456789') } 
            setInput={ (val) => setMySecret(val.slice(-1)[0]) } 
          />

          <Client
            key={ keyClient }
            openMM={ () => setShowMainMenu(true) }
            mySecret= { mySecret }
            myGuess={ myGuess }
            setMyGuess={ setMyGuess }
            myRes={ myRes }
            opGuess={ opGuess }
            opRes={ opRes }
            isMyTurn={ isMyTurn }
            restartGame={ restartGame }
            myWin={ myWin }
            // setMyWin= { setMyWin }
            timers={ timers }
            setTimers={ setTimers }
            msgArr={ msgArr }
            setMsgArr={ setMsgArr }
          />
        
          { (isMyTurn!==null) && 
            <ContainerAI
              // key={ keyClient + 1 }
              isMyTurn= { isMyTurn }
              myGuess={ myGuess }
              myRes={ myRes }
              setMyRes={ setMyRes }
              opGuess={ opGuess }
              setOpGuess={ setOpGuess }
              opRes={ opRes }
              msgArr={ msgArr }
              setMsgArr={ setMsgArr }
            />
          }
        </> 
    }
   </>
  );
}

export default App;
