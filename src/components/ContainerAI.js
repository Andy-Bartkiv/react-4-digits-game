import { useState, useEffect } from "react";
import { rndStr, uniqRndStr } from "../utils/rndMethods";
import calcDigitMatch from "../utils/calcDigitMatch";
import calcBruteGuess from "../utils/calcBruteGuess";

const poolOfTextMsgs = {
    1: ['Greetings, master!', 'Hello, friend!', 'Hi there!'],
    3: ['How are you today?', 'How are things?', "What's up?"],
    6: ['Good algorithm can brake any code in seven turns.', 
        "It is proved that any number can be solved within seven turns."]
}

function textMsgChatAI(turn) {
    const rndMsg = (arr) => arr[Math.floor(Math.random() * arr.length)];
    return {
        id: Date.now(),
        author: 'AI',
        text: rndMsg(poolOfTextMsgs[turn])
    }
};

const randomOrLogic = (lvl, turn) => {
    const lvlValue = { 'junior': 12, 'middle': 9 };
    const turnLimit = (turn - 7) / (lvlValue[lvl] - 7); 
    return Math.random() >= turnLimit;
}
const lvlAI = 'middle';
// const lvlAI = 'junior';

const ContainerAI = ({ 
    isMyTurn, 
    myGuess, 
    myRes, 
    setMyRes, 
    opGuess, 
    setOpGuess, 
    opRes, 
    msgArr, 
    setMsgArr }) => {

// SET AI SECRET NUMBER    
    const [opSecret, setOpSecret] = useState(null);
    useEffect( () => {
        setOpSecret(uniqRndStr('0123456789'));
    }, []);

// AI RESPONDS TO MyGuess
    useEffect( () => {
        if (myGuess.length && isMyTurn !== null)
            setTimeout(() => {
                const newRes = calcDigitMatch(myGuess[myGuess.length-1], opSecret);
                setMyRes([...myRes, newRes]);
            }, 500); // 750
    }, [myGuess]);

// AI TRIES TO GUESS HUMAN SECRET NUMBER
    useEffect( () => {
        const delayRnd = Math.floor(Math.random() * 2250) + 2000; // 2250 + 2000
        if (isMyTurn === false 
            && myRes.slice(-1)[0] !== '44' 
            && myRes.length < 12) {
                setTimeout(() => {
                    const newGuess = (randomOrLogic(lvlAI, opGuess.length+1))
                        ? rndStr('0123456789')
                        : calcBruteGuess(opGuess, opRes);
                    setOpGuess([...opGuess, newGuess]);
                }, delayRnd); // delayRnd
        }
    }, [myRes]);

// AI CHATTING at turn 1, 3, 6
    useEffect(() => {
        const delayRnd = Math.floor(Math.random() * 1250) + 1000;
        if (opGuess.length && isMyTurn !== null)
            setTimeout(() => {
                if (Object.keys(poolOfTextMsgs).includes(opGuess.length))
                    setMsgArr([...msgArr, textMsgChatAI(opGuess.length)]);
            }, delayRnd);
    }, [opGuess]);
    
    return null;
}

export default ContainerAI;
