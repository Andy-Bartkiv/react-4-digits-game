import Loader from './UI/loader/Loader';
import Header from './Header';
import Navbar from './Navbar';
import Input4D from './Input4D';
import OutputList from './OutputList';

function Client({ myNumber, myGuess, setMyGuess, myRes, opGuess, opRes, isMyTurn, restartGame }) {

  const lastIndex = myRes.length-1;
  const opNumber = (myRes[lastIndex] !== '44') ? '????': myGuess[lastIndex];

////////////////////////////// RENDER /////////////////////////////
  return (
    <div className="Client">

        <Header/>

        <Navbar restartGame={ restartGame }/>

        <div className='Client-output'>
            <OutputList guess={ myGuess } res={ myRes } num={ myNumber }/> 
            <OutputList guess={ opGuess } res={ opRes } num={ opNumber } opponent={ true }/> 
        </div>

        <Input4D input={ myGuess } setInput={ setMyGuess } isMyTurn={ isMyTurn }/>
        
    </div>
  );
}

export default Client;