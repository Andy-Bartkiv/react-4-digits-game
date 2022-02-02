import Loader from './UI/loader/Loader';
import Header from './Header';
import Navbar from './Navbar';
import Input4D from './Input4D';
import Input from './Input';
import OutputList from './OutputList';
import DevCheatSheet from './DevCheatSheet';
import ChatTab from './ChatTab';
import CheatSheet from './CheatSheet';
import CongratText from './CongratText';
import { useEffect, useState } from 'react';

function Client({ openMM, mySecret, myGuess, setMyGuess, myRes, opGuess, opRes, isMyTurn, restartGame, myWin, msgArr, setMsgArr }) {

  const opNumber = (myWin) ? myGuess[myRes.length-1] : '????';

  const [chSh, setChSh] = useState(false);
  const [appChat, setAppChat] = useState(false);

  useEffect(() => {
    if (isMyTurn === null) {
      setTimeout(() => {
        setAppChat(false);
        setChSh(false);
      }, 500)
    } 
  }, [isMyTurn]);

////////////////////////////// RENDER /////////////////////////////
  return (
    <div className="Client">

        <Header isMyTurn={ isMyTurn } openMM={ openMM }/>

        <Navbar
          chat= { appChat }
          toggleChat={ ()=>setAppChat(!appChat) } 
          restartGame={ restartGame } 
          cheatSheet= { chSh }
          toggleCheatSheet={ ()=>setChSh(!chSh) }
          msgArr={ msgArr }
        />

        <DevCheatSheet guess={ myGuess } res={ myRes } />

        <div className='Client-output'>

            <div className={(appChat) ? "output-flip is-flipped-l" : "output-flip" }>
              <ChatTab msgArr={ msgArr } setMsgArr={ setMsgArr }/>
              <OutputList guess={ myGuess } res={ myRes } num={ mySecret }/> 
            </div>

            <div className={(chSh) ? "output-flip is-flipped-r" : "output-flip" }>
              <CheatSheet guess={ myGuess } res={ myRes }/>
              <OutputList guess={ opGuess } res={ opRes } num={ opNumber } opponent={ true }/>
            </div>
        </div>

        {/* <Input4D input={ myGuess } setInput={ setMyGuess } isMyTurn={ isMyTurn } win={ myWin }/> */}

        <Input input={ myGuess } setInput={ setMyGuess }/>

        <CongratText win={ myWin }/>

    </div>
  );
}

export default Client;