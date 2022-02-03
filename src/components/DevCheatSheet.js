import { useEffect, useState } from "react";
import NumPlates from "./NumPlates";
import Plate from "./UI/plate/Plate";
import { calcAIGuess } from "../utils/calcAIGuess";
import { 
    updPostionAfterGuess, 
    updAbsentPresentByNewPosition, 
    updAbsentAndPositionByPreviousGuesses,
    updPresentByPreviousGuesses,
    updPositionByOnlyPresent,
    updPositionByPresentLastPos,
    updPositionByPrevGuessesAndAP,
    updPresentByPrevGuessesAndAP
} from "../utils/chShMethods"

const DevCheatSheet = ({ guess, res }) => {

    const header = '0123456789/';

    const createArray11x4 = () => {
        const initPos = Array(4).fill(null).map(() => [...Array(11).fill(' ')]);
        initPos.forEach((row, i) => row[row.length-1] = 'ABCD'[i]);
        return initPos;
    }
    const [position, setPosition] = useState(createArray11x4());
    const [digPresent, setDigPresent] = useState([]);
    const [digAbsent, setDigAbsent] = useState([]);

    useEffect(() => {
        if (guess.length) {
           
            let newDigAbsent = [...digAbsent];
            let newDigPresent = [...digPresent];
            let newPos = [...position].map(row => [...row]);

// +++ POSITION
            newPos = updPostionAfterGuess(position, guess, res);

// --- ANALYSE Previous Guesses to update Position, PRESENT and ABSENT
            const updAAPBPG = 
                updAbsentAndPositionByPreviousGuesses(newPos,newDigAbsent, guess, res);
            [newDigAbsent, newPos] = [...updAAPBPG];
            const updPBPG = 
                updPresentByPreviousGuesses(newDigPresent, guess, res);
            newDigPresent = [...updPBPG]

// +++ ANALYSE POSITIONS GRID to update ABSENT and PRESENT
            const updAPBNP = 
                updAbsentPresentByNewPosition(newPos, newDigPresent, newDigAbsent, guess, res);
            [newDigAbsent, newDigPresent] = [...updAPBNP];

// +++ UPDATE POSITIONS GRID based on Only PRESENT array
            newPos = updPositionByOnlyPresent(newPos, newDigPresent);

// --- update newPos and PRESENT by revising Prev Guesses considering PRESENT and ABSENT
            newPos = updPositionByPrevGuessesAndAP(newPos, newDigPresent, guess, res);
            newDigPresent = [...updPresentByPrevGuessesAndAP(newDigPresent, newDigAbsent, guess, res)]

// +++ recalculate newPos if any digPresent has only 1 legal position
            newPos = updPositionByPresentLastPos(newPos, newDigPresent);


// CLACULATE AVAILABLE GUESSES
            const [rndNumber, rndNoPresent, l1, l2] = calcAIGuess(newPos, newDigPresent, guess);
            console.log(rndNumber, rndNoPresent, l1,l2)
            console.log('ABSENT-', newDigAbsent);
            console.log('PRESENT', newDigPresent);
            // console.table(newPos);   
            setDigPresent(newDigPresent);
            setDigAbsent(newDigAbsent);
            setPosition(newPos);

            // 7928 - 5246 - 1345 - 1335 - 1331 - 1802 - 1230 ERROR (2,4) Absent , (0) Present
            // Other potentially breaking combos:
            // 0101 - 2323 - 4545 - 1054 - 1052 - 3052
            
                    // 9012 - 8764 - 3535 - 2809 - 3125 - 1930

        } else {
            setDigPresent([]);
            setDigAbsent([]);
            setPosition(createArray11x4());
        }
    }, [res])

    return (
        <div className="ch-sh-wrap right">

            <div className="ch-sh-header">
                {/* <NumPlates str={ header } /> */}
                { header.split('').map((d, i) =>
                    <Plate key={i} char={ (digPresent.includes(d*1)) ? 'V' : d }/>
                )}
            </div>
            <div className="ch-sh-position">
                { position.map((row, i) =>
                    <NumPlates key={i} str={ row.join('') }/>
                )}
            </div>

        </div>
    )
}

export default DevCheatSheet
