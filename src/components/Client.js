import Loader from './UI/loader/Loader';
import Header from './Header';
import Navbar from './Navbar';
import Input4D from './Input4D';
import OutputList from './OutputList';
import CheatSheet from './CheatSheet';

function Client({ mySecret, myGuess, setMyGuess, myRes, opGuess, opRes, isMyTurn, restartGame }) {

  const lastIndex = myRes.length-1;
  const opNumber = (myRes[lastIndex] !== '44') ? '????': myGuess[lastIndex];

////////////////////////////// RENDER /////////////////////////////
  return (
    <div className="Client">

        <Header/>

        <Navbar restartGame={ restartGame }/>

        <CheatSheet guess={ myGuess } res={ myRes } />

        <div className='Client-output'>
            <OutputList guess={ myGuess } res={ myRes } num={ mySecret }/> 
            <OutputList guess={ opGuess } res={ opRes } num={ opNumber } opponent={ true }/> 
        </div>

        <Input4D input={ myGuess } setInput={ setMyGuess } isMyTurn={ isMyTurn }/>
        
    </div>
  );
}

export default Client;