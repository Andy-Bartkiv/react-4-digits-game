import Header from './Header';
import Navbar from './Navbar';
import Input4D from './Input4D';
import Input from './Input';
import OutputList from './OutputList';
import ChatTab from './ChatTab';
import CheatSheet from './CheatSheet';
import CongratText from './CongratText';
import { useEffect, useState } from 'react';

function Client({ 
  openMM, 
  mySecret, 
  myGuess, 
  setMyGuess, 
  myRes, 
  opGuess, 
  opRes, 
  isMyTurn, 
  restartGame, 
  myWin, 
  msgArr, 
  setMsgArr,
  timers,
  setTimers
}) {

  const oppNumber = (myWin) ? myGuess[myRes.length-1] : '????';

  const [showChSh, setShowChSh] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (isMyTurn === null) {
      setTimeout(() => {
        setShowChat(false);
        setShowChSh(false);
      }, 500)
    } 
  }, [isMyTurn]);

////////////////////////////// RENDER /////////////////////////////
  return (
    <div className="Client">

        <Header 
          isMyTurn={ isMyTurn } 
          openMM={ openMM } 
          timers={ timers } 
          setTimers={ setTimers }
        />

        <Navbar
          msgArr={ msgArr }
          chat={ showChat }
          toggleChat={ ()=>setShowChat(!showChat) } 
          restartGame={ restartGame } 
          cheatSheet= { showChSh }
          toggleCheatSheet={ ()=>setShowChSh(!showChSh) }
        />

        <div className='Client-output'>

            <div className={ (showChat) ? "output-flip is-flipped-l" : "output-flip" }>
              <ChatTab msgArr={ msgArr } setMsgArr={ setMsgArr }/>
              <OutputList guess={ myGuess } res={ myRes } num={ mySecret }/> 
            </div>

            <div className={(showChSh) ? "output-flip is-flipped-r" : "output-flip" }>
              <CheatSheet guess={ myGuess } res={ myRes }/>
              <OutputList guess={ opGuess } res={ opRes } num={ oppNumber } opponent={ true }/>
            </div>
        </div>

        <Input4D input={ myGuess } setInput={ setMyGuess } isMyTurn={ isMyTurn } win={ myWin }/>

        {/* <Input input={ myGuess } setInput={ setMyGuess }/> */}

        <CongratText win={ myWin }/>

    </div>
  );
}

export default Client;