import Loader from './UI/loader/Loader';
import Header from './Header';
import Input from './Input';
import Input4D from './Input4D';
import { useEffect, useState } from "react";
import OutputList from './OutputList';

function Client() {

  const [myGuess, setMyGuess] = useState([]);
  const [myRes, setMyRes] = useState([]);
  const [opGuess, setOpGuess] = useState([]);
  const [opRes, setOpRes] = useState([]);

  const [isMyTurn, setIsMyTurn] = useState(null);

  setInterval(() => setIsMyTurn(true), 2000);

  useEffect(() => {
    if (myGuess.length) {
      setTimeout(() => {
        const newRes = compareDigits(myGuess[myGuess.length-1], NUMBER)
        setMyRes([...myRes, newRes]);
      }, 1000);
      setTimeout(() => {
        setOpGuess([...opGuess, myGuess[myGuess.length-1]])
        const newRes = compareDigits(myGuess[myGuess.length-1], NUMBER)
        setOpRes([...opRes, newRes]);
      }, 5000);
    }
  console.log(myGuess, myRes, isMyTurn);
  }, [myGuess, isMyTurn]);

  const NUMBER = '2468';
  // console.log(myGuess);

  function compareDigits(str1, str2) {
    let res = [0, 0];
    for (let d of str2) {
      if (str1.indexOf(d) >= 0) res[0]++;
      if (str1.indexOf(d) === str2.indexOf(d)) res[1]++;
    }
    return res.join('');
  }

////////////////////////////// RENDER /////////////////////////////
  return (
    <div className="Client">
        <Header/>

        <div className='Client-navbar'>
            <li>Menu</li>
            <li>Game</li>
            <li>Hint</li>
        </div>

        <div className='Client-output'>

        <OutputList guess={ myGuess } res={ myRes } num={ '????' }/> 

        <OutputList guess={ opGuess } res={ opRes } num={ NUMBER }/> 
      </div>

        {/* <Input input={ myGuess } setInput={ setMyGuess } isMyTurn={ isMyTurn }/> */}

        <Input4D input={ myGuess } setInput={ setMyGuess } isMyTurn={ isMyTurn }/>
        

    </div>
  );
}

export default Client;