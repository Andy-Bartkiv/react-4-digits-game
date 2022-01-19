import Loader from './UI/loader/Loader';
import Header from './Header';
import Navbar from './Navbar';
import Input4D from './Input4D';
import { useEffect, useState } from "react";
import OutputList from './OutputList';

function Client() {

  const [myGuess, setMyGuess] = useState([]);
  const [myRes, setMyRes] = useState([]);
  const [opGuess, setOpGuess] = useState([]);
  const [opRes, setOpRes] = useState([]);

  const [isMyTurn, setIsMyTurn] = useState(null);

  useEffect( () => {
    setTimeout(() => setIsMyTurn(true), 1500);
  },[])

  useEffect(() => setIsMyTurn(true), [opGuess]);

  useEffect(() => {
    if (myGuess.length) {
        setIsMyTurn(false);
      setTimeout(() => {
        const newRes = compareDigits(myGuess[myGuess.length-1], NUMBER)
        setMyRes([...myRes, newRes]);
      }, 1000);
      setTimeout(() => {
        setOpGuess([...opGuess, myGuess[myGuess.length-1]])
        const newRes = compareDigits(myGuess[myGuess.length-1], NUMBER)
        setOpRes([...opRes, newRes]);
      }, 2500);
    }
  console.log(myGuess, myRes, isMyTurn);
  }, [myGuess]);

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

        <Navbar/>

        <div className='Client-output'>
            <OutputList guess={ myGuess } res={ myRes } num={ '????' }/> 
            <OutputList guess={ opGuess } res={ opRes } num={ NUMBER } opponent={ true }/> 
        </div>

        <Input4D input={ myGuess } setInput={ setMyGuess } isMyTurn={ isMyTurn }/>
        
    </div>
  );
}

export default Client;