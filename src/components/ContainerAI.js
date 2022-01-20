import { useState, useEffect } from "react";
import { rndStr, uniqRndStr } from "./utils/rndMethods";
import calcDigitMatch from "./utils/calcDigitMatch";

const ContainerAI = ({ isMyTurn, myGuess, myRes, setMyRes, opGuess, setOpGuess, opRes }) => {
    
    const [opNumber, setOpNumber] = useState(null);
    
    console.log('ContainerAI number =', opNumber);

    useEffect( () => {
        setOpNumber(uniqRndStr('0123456789'));
    }, []);

    useEffect(() => {
        if (myGuess.length && isMyTurn !== null) {
            setTimeout(() => {
                const newRes = calcDigitMatch(myGuess[myGuess.length-1], opNumber)
                setMyRes([...myRes, newRes]);
            }, 1000);
        }
        if ( isMyTurn !== null) setTimeout(() => {
            setOpGuess([...opGuess, rndStr('0123456789')]);
        }, 2500);
        console.log('MyGuess - Upd', isMyTurn);
        }, [myGuess]);
    
    return null;
}

export default ContainerAI
