import { useState, useEffect } from "react";
import { rndStr, uniqRndStr } from "../utils/rndMethods";
import calcDigitMatch from "../utils/calcDigitMatch";
import calcAIGuess from "../utils/calcAIGuess";
import calcAIChSh from "../utils/calcAIChSh";
import calcKnuthGuess from "../utils/calcKnuthGuess";

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

const createArray11x4 = () => {
    const initPos = Array(4).fill(null).map(() => [...Array(11).fill(' ')]);
    initPos.forEach((row, i) => row[row.length-1] = 'ABCD'[i]);
    return initPos;
};

    // function calcNewGuessOLD(position, digPresent, guess) {
    //     let newGuess = null;
    //     if (guess.length === 0)
    //         newGuess = '1234';
    //     else if (guess.length === 1)
    //         newGuess = '5678';
    //     else if (guess.length <= 4)
    //         newGuess = rndStr('0123456789');
    //     else {
    //         const [rndNumber, rndNoPresent, l1, l2] = calcAIGuess(position, digPresent, guess);
    //         console.log('OPP', rndNumber, rndNoPresent, l1, l2)
    //         const N = '0123456789';
    //         newGuess = (rndNumber) ? rndNumber : rndStr(N);
    //     }
    //     return newGuess;
    // }

const calcNewGuess = (position, guess) => {
    const [rndNumber, l1] = calcAIGuess(position, guess);
    console.log('OPP', rndNumber, l1);
    return (rndNumber) ? rndNumber : rndStr('0123456789');
}

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

    const [position, setPosition] = useState(createArray11x4());
    const [digPresent, setDigPresent] = useState([]);
    const [digAbsent, setDigAbsent] = useState([]);
    useEffect(() => {
        if (opGuess.length && isMyTurn !== null) {
            const [ newPos, newDigAbsent, newDigPresent ] = 
                calcAIChSh(position, digAbsent, digPresent, opGuess, opRes);
            setPosition(newPos);
            setDigAbsent(newDigAbsent);
            setDigPresent(newDigPresent);
        } else {
            setPosition(createArray11x4());
            setDigAbsent([]);
            setDigPresent([]);
        }
    }, [opRes])

// SET AI SECRET NUMBER    
    const [opSecret, setOpSecret] = useState(null);
    useEffect( () => {
        setOpSecret(uniqRndStr('0123456789'));
        // setOpSecret('1234');
    }, []);
    useEffect( () => console.log('ContainerAI number =', opSecret), [opSecret]);

// AI RESPONDS TO MyGuess
    useEffect(() => {
        if (myGuess.length && isMyTurn !== null) {
            const t = setTimeout(() => {
                const newRes = calcDigitMatch(myGuess[myGuess.length-1], opSecret);
                setMyRes([...myRes, newRes]);
            }, 500); // 750
        }
        return (t) => clearTimeout(t);
    }, [myGuess]);

// AI TRIES TO GUESS HUMAN SECRET NUMBER
    useEffect(() => {
        const delayRnd = Math.floor(Math.random() * 2250) + 2000; // 2250 + 2000
        if (isMyTurn === false 
            && myRes.slice(-1)[0] !== '44' 
            && myRes.length < 12) {
                // console.log('Calculating OP Guess')           
            const t = setTimeout(() => {
                const newGuess = calcNewGuess(position, opGuess);
                setOpGuess([...opGuess, newGuess]);
            }, delayRnd); // 2500 ? delayRnd ? 
        }
        return (t) => clearTimeout(t);
    }, [myRes]);

// AI CHATTING at turn 1, 3, 6
    useEffect(() => {
        const delayRnd = Math.floor(Math.random() * 1250) + 1000;
        if (opGuess.length && isMyTurn !== null) {
            const t = setTimeout(() => {
                if (Object.keys(poolOfTextMsgs).includes(opGuess.length))
                    setMsgArr([...msgArr, textMsgChatAI(opGuess.length)]);
            }, delayRnd);
        }
      return (t) => clearTimeout(t)
    }, [opGuess]);
    
    
    return null;
}

export default ContainerAI;
