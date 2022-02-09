import { useState, useEffect } from "react";
import { rndStr, uniqRndStr } from "../utils/rndMethods";
import calcDigitMatch from "../utils/calcDigitMatch";
import calcKnuthGuess from "../utils/calcKnuthGuess";

// const worker = new Worker('../../public/thread.worker');

const ContainerSeniorAI = ({ 
    isMyTurn, 
    myGuess, 
    myRes, 
    setMyRes, 
    opGuess, 
    setOpGuess, 
    opRes, 
    msgArr, 
    setMsgArr }) => {

// init Worker on mount
    // useEffect( () => {
    //     const listener = ({ data: { type, payload } }) => {
    //     console.log(type, payload);
    //     if (type === 'UPDATE_SUCCESS') 
    //         setLength(payload);
    //     };
    //     worker.addEventListener('message', listener);
    //     return () => worker.removeEventListener('message', listener);
    // }, []);

    // useEffect( () => {
    //     worker.postMessage({ type: 'UPDATE', payload: myGuess });
    // }, [myGuess]);

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