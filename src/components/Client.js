import Loader from './UI/loader/Loader';
import Header from './Header';
import Navbar from './Navbar';
import Input4D from './Input4D';
import OutputList from './OutputList';
import DevCheatSheet from './DevCheatSheet';
import CheatSheet from './CheatSheet';
import CongratText from './CongratText';
import { useEffect, useState } from 'react';

function Client({ mySecret, myGuess, setMyGuess, myRes, opGuess, opRes, isMyTurn, restartGame, myWin }) {

  const opNumber = (myWin) ? myGuess[myRes.length-1] : '????';

  const [chSh, setChSh] = useState(false);
  const [appChat, setAppChat] = useState(false);

  useEffect(() => {
    if (isMyTurn === null) setChSh(false)
  }, [isMyTurn]);

////////////////////////////// RENDER /////////////////////////////
  return (
    <div className="Client">

        <Header/>

        <Navbar 
          toggleChat={ ()=>setAppChat(!appChat) } 
          restartGame={ restartGame } 
          toggleCheatSheet={ ()=>setChSh(!chSh) }
        />

        <DevCheatSheet guess={ myGuess } res={ myRes } />

        <div className='Client-output'>

            <div className={(appChat) ? "output-flip is-flipped-l" : "output-flip" }>
              <CheatSheet guess={ myGuess } res={ myRes }/>
              <OutputList guess={ myGuess } res={ myRes } num={ mySecret }/> 
            </div>

            <div className={(chSh) ? "output-flip is-flipped-r" : "output-flip" }>
              <CheatSheet guess={ myGuess } res={ myRes }/>
              <OutputList guess={ opGuess } res={ opRes } num={ opNumber } opponent={ true }/>
            </div>
        </div>

        <Input4D input={ myGuess } setInput={ setMyGuess } isMyTurn={ isMyTurn } win={ myWin }/>

        <CongratText win={ myWin }/>

    </div>
  );
}

export default Client;