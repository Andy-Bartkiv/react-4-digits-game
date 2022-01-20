import { useState, useEffect } from "react";
import { rndStr, uniqRndStr } from "../utils/rndMethods";
import calcDigitMatch from "../utils/calcDigitMatch";

const ContainerAI = ({ isMyTurn, myGuess, myRes, setMyRes, opGuess, setOpGuess, opRes }) => {
    
    const [opNumber, setOpNumber] = useState(null);
    
    useEffect( () => {
        setOpNumber(uniqRndStr('0123456789'));
    }, []);

    useEffect(() => {
        if (myGuess.length && isMyTurn !== null) {
            setTimeout(() => {
                const newRes = calcDigitMatch(myGuess[myGuess.length-1], opNumber)
                setMyRes([...myRes, newRes]);
            }, 1000);
        
                        console.log('ContainerAI number =', opNumber);
        }
    }, [myGuess]);

    useEffect(() => {
        // console.log(myRes, isMyTurn);
                                        // Condition SHOULD BE CHANGED
        if (isMyTurn !== null && myRes.slice(-1)[0] !== '44') {
            console.log('Calculating OP Guess')
            setTimeout(() => {
                setOpGuess([...opGuess, rndStr('0123456789')]);
            }, 2500);
        }
    }, [myRes]);
    
    return null;
}

export default ContainerAI
