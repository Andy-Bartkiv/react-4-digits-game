import Loader from './UI/loader/Loader';
import Header from './Header';
import Navbar from './Navbar';
import Input4D from './Input4D';
// import { useEffect, useState } from "react";
import OutputList from './OutputList';

function Client({ isMyTurn, myGuess, setMyGuess, myRes, opGuess, opRes, myNumber }) {

////////////////////////////// RENDER /////////////////////////////
  return (
    <div className="Client">

        <Header/>

        <Navbar/>

        <div className='Client-output'>
            <OutputList guess={ myGuess } res={ myRes } num={ '????' }/> 
            <OutputList guess={ opGuess } res={ opRes } num={ myNumber } opponent={ true }/> 
        </div>

        <Input4D input={ myGuess } setInput={ setMyGuess } isMyTurn={ isMyTurn }/>
        
    </div>
  );
}

export default Client;