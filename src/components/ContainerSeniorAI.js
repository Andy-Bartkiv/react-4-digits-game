import { useState, useEffect } from "react";
import { rndStr, uniqRndStr } from "../utils/rndMethods";
import calcDigitMatch from "../utils/calcDigitMatch";
import calcKnuthGuess from "../utils/calcKnuthGuess";
import calcBruteGuess from "../utils/calcBruteGuess";

const ContainerSeniorAI = ({ 
    isMyTurn, myGuess, myRes, opGuess, opRes, msgArr, 
    setMyRes, setOpGuess, setMsgArr 
}) => {

// SET AI SECRET NUMBER    
    const [opSecret, setOpSecret] = useState(null);
    useEffect( () => setOpSecret(uniqRndStr('0123456789')), []);

// AI RESPONDS TO MyGuess
    useEffect( () => {
        // AI CHAT MSG before 2nd guess
        if (opGuess.length === 1 && isMyTurn !== null) {
            const newTextMsg = {
                id: Date.now(),
                author: 'AI',
                text: 'Second guess may take me about 60sec to calculate. Please be patient...'
            };
            setMsgArr([...msgArr, newTextMsg]);
        }
        if (myGuess.length && isMyTurn !== null)
            setTimeout( () => {
                const newRes = calcDigitMatch(myGuess[myGuess.length-1], opSecret);
                setMyRes([...myRes, newRes]);
            }, 500); // 750
    }, [myGuess]);

// AI TRIES TO GUESS HUMAN SECRET NUMBER
    useEffect(() => {
        const delayRnd = Math.floor(Math.random() * 2250) + 2000; // 2250 + 2000
        if (isMyTurn === false 
            && myRes.slice(-1)[0] !== '44' 
            && myRes.length < 12) {
                const newGuess = calcKnuthGuess(opGuess, opRes);     
                if (myGuess.length) 
                    setOpGuess([...opGuess, newGuess]);
                else
                    setTimeout( () => {
                        setOpGuess([...opGuess, newGuess])
                    }, delayRnd);
        }
    }, [myRes]); 
    

    return null;
}

export default ContainerSeniorAI;