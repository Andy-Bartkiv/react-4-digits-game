import { useEffect, useState } from "react";
import { uniqRndStr } from "../utils/rndMethods";
import calcDigitMatch from '../utils/calcDigitMatch';
import Client from './Client';
import ContainerAI from './ContainerAI';
import ContainerSeniorAI from './ContainerSeniorAI';
import SecretSelect from './SecretSelect';


function Game44({ difLvl, openMainMenu }) {

  const [showSecretSelect, setShowSecretSelect] = useState(true);
  const [keyClient, setKeyClient] = useState(Date.now());

  const timerLimit = 600;
  const [timers, setTimers] = useState({ my: timerLimit, opp: timerLimit });
  const [myGuess, setMyGuess] = useState([]);
  const [myRes, setMyRes] = useState([]);
  const [opGuess, setOpGuess] = useState([]);
  const [opRes, setOpRes] = useState([]);
  const [isMyTurn, setIsMyTurn] = useState(null);
  const [mySecret, setMySecret] = useState(null);
  const [myWin, setMyWin] = useState(null);
  const [msgArr, setMsgArr] = useState([]);

  useEffect( () => {
    if (mySecret) {
      // Random starting player: false = OPP, true = ME
        if (difLvl !== 'senior')
            setIsMyTurn([false, true][Math.floor(Math.random() * 2)]);
        else
            setIsMyTurn(true);
        setShowSecretSelect(false);
        setTimers({ my: timerLimit, opp: timerLimit });
    }
  }, [mySecret]);

  useEffect(() => {
    if (myGuess.length) setIsMyTurn(false)
  }, [myGuess]);

  // CHECK WINNING CONDITION for ME
  useEffect(() => {
    if (myRes.length && myRes.slice(-1)[0] === '44') {
      setMyWin(true);
    } else if (myRes.length && myRes.length >= 12) {
      setMyWin(false);
    }
  }, [myRes]);
  // CHECK WINNING CONDITION for OPPONENT
  useEffect(() => {
    if (opRes.length && isMyTurn !== null) 
      setIsMyTurn(true);
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
    if (opGuess.length && isMyTurn !== null) {
      setTimeout(() => {
        const newRes = calcDigitMatch(opGuess[opGuess.length-1], mySecret)
        setOpRes([...opRes, newRes]);
      }, 500); // 750
     }
  }, [opGuess]);

  function restartGame() {
    if (isMyTurn || myWin !== null) {
      setMyGuess([]); setMyRes([]);
      setOpGuess([]); setOpRes([]);
      setIsMyTurn(null);
      setMySecret(null);
      setMsgArr([]);
      setShowSecretSelect(true);
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
        <SecretSelect
            visible={ showSecretSelect }
            input={ uniqRndStr('0123456789') } 
            setInput={ (val) => setMySecret(val.slice(-1)[0]) } 
        />

        <Client
            key={ keyClient }
            isMyTurn={ isMyTurn }
            myWin={ myWin }
            timers={ timers }
            msgArr={ msgArr }
            mySecret= { mySecret }
            myGuess={ myGuess }
            myRes={ myRes }
            opGuess={ opGuess }
            opRes={ opRes }
            setMyGuess={ setMyGuess }
            setTimers={ setTimers }
            setMsgArr={ setMsgArr }
            restartGame={ restartGame }
            openMM={ openMainMenu }
        />
    
        { (isMyTurn!==null) && 
        // <ContainerSeniorAI
        <ContainerAI
            difLvl={ difLvl }
            isMyTurn= { isMyTurn }
            myGuess={ myGuess }
            myRes={ myRes }
            opGuess={ opGuess }
            opRes={ opRes }
            msgArr={ msgArr }
            setMyRes={ setMyRes }
            setOpGuess={ setOpGuess }
            setMsgArr={ setMsgArr }
        />
        }
    </> 
  );
}

export default Game44;