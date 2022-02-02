import { useState, useEffect } from "react";
import { rndStr, uniqRndStr } from "../utils/rndMethods";
import calcDigitMatch from "../utils/calcDigitMatch";

function textMsgChatAI(turn) {
    const poolOfTextMsgs = {
        1: ['Greetings, master!', 'Hello, friend!', 'Hi there!'],
        2: ['How are you today?', 'How are things?', "What's up?"],
        6: ['Good algorithm can brake any code in seven turns.', 
            "It is proved that any number can be solved within seven turns."]
    }
    const rndMsg = (arr) => arr[Math.floor(Math.random() * arr.length)];

    return {
        id: Date.now(),
        author: 'AI',
        text: rndMsg(poolOfTextMsgs[turn])
    }
}

const ContainerAI = ({ isMyTurn, myGuess, myRes, setMyRes, opGuess, setOpGuess, opRes, myWin, msgArr, setMsgArr }) => {
    
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
        // setOpSecret(uniqRndStr('0123456789'));
        setOpSecret('1234');
    }, []);

    useEffect( () => console.log('ContainerAI number =', opSecret), [opSecret]);

    useEffect(() => {
        if (myGuess.length && isMyTurn !== null) {
            const t = setTimeout(() => {
                const newRes = calcDigitMatch(myGuess[myGuess.length-1], opSecret);
                setMyRes([...myRes, newRes]);
            }, 75); // 750
        }
        return (t) => clearTimeout(t);
    }, [myGuess]);

    useEffect(() => {
        const delayRnd = Math.floor(Math.random() * 2250) + 2000;
        if (isMyTurn === false 
            && myRes.slice(-1)[0] !== '44' 
            && myRes.length < 12) {
                // console.log('Calculating OP Guess')
            const t = setTimeout(() => {
                setOpGuess([...opGuess, calcNewGuess(opGuess, opRes)]);
            }, delayRnd); // 2500 ? delayRnd ? 
        }
        return (t) => clearTimeout(t);
    }, [myRes]);

// CHATTING
    useEffect(() => {
        const delayRnd = Math.floor(Math.random() * 1250) + 1000;
        if (opGuess.length && isMyTurn !== null) {
            const t = setTimeout(() => {
                if ([1,2,6].includes(opGuess.length))
                    setMsgArr([...msgArr, textMsgChatAI(opGuess.length)]);
            }, delayRnd); // 750
        }
      return (t) => clearTimeout(t)
    }, [opGuess]);
    
    
    return null;
}

export default ContainerAI
