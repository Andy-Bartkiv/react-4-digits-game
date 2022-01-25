import { useState, useEffect } from "react";
import { rndStr, uniqRndStr } from "../utils/rndMethods";
import calcDigitMatch from "../utils/calcDigitMatch";

const ContainerAI = ({ isMyTurn, myGuess, myRes, setMyRes, opGuess, setOpGuess, opRes, myWin }) => {
    
    const [opSecret, setOpSecret] = useState(null);

    function calcNewGuess(guess, res) {
        let newGuess = null;
        if (guess.length === 0)
            newGuess = '1234';
        else if (guess.length === 1)
            newGuess = '5678';
        else {
            const N = '0123456789';
            newGuess = rndStr(N);
        }
        return newGuess;
    }
    
    useEffect( () => {
        setOpSecret(uniqRndStr('0123456789'));
        // setOpSecret('1234');
    }, []);

    useEffect( () => console.log('ContainerAI number =', opSecret), [opSecret])

    useEffect(() => {
        if (myGuess.length && isMyTurn !== null) {
            const t = setTimeout(() => {
                const newRes = calcDigitMatch(myGuess[myGuess.length-1], opSecret)
                setMyRes([...myRes, newRes]);
            }, 75); // 750        
        }
        return (t) => clearTimeout(t);
    }, [myGuess]);

    useEffect(() => {
                            // Condition SHOULD BE CHANGED
        if (isMyTurn === false && myRes.slice(-1)[0] !== '44' && myRes.length < 12) {
            console.log('Calculating OP Guess')
            const t = setTimeout(() => {
                setOpGuess([...opGuess, calcNewGuess(opGuess, opRes)]);
            }, 1250); // 2500
        }
        return (t) => clearTimeout(t);
    }, [myRes]);
    
    return null;
}

export default ContainerAI
