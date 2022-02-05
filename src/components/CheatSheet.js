import Plate from "./UI/plate/Plate";
import PlateActive from "./UI/plateActive/PlateActive";
import { useState, useEffect } from "react";
import { 
    updPostionAfterGuess, 
    updAbsentPresentByNewPosition, 
    updAbsentAndPositionByPreviousGuesses,
    updPresentByPreviousGuesses,
    updPositionByOnlyPresent,
    updPositionByPresentLastPos,
    updPositionByPrevGuessesAndAP,
    updPresentByPrevGuessesAndAP
} from "../utils/chShMethods";

const CheatSheet = ({ guess, res }) => {

    const header = 'HINT';

    const createArray11x4 = () => {
        const initPos = Array(4).fill(null).map(() => [...Array(11).fill(' ')]);
        initPos.forEach((row, i) => row[row.length-1] = '????'[i]);
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
            newDigPresent = [...updPBPG];
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
  
            setDigPresent(newDigPresent);
            setDigAbsent(newDigAbsent);
            setPosition(newPos);
        } else {
            setDigPresent([]);
            setDigAbsent([]);
            setPosition(createArray11x4());
        }
    }, [res])

    return (
        <div className="cheat-sheet">

            <div className="list-header" style={{ paddingTop:'.25em' }}>
                { header.split('').map((e, i) => <Plate key={i} char={ e } bg={'teal'}/>) }
            </div>

            <div className="cheat-sheet-table">
                <div className="table-plates">
                    { '0123456789='.split('').map((e, i) => 
                        <PlateActive key={i} char={ e }/>)
                    }
                </div>
                { position.map((pos, iP) =>
                    <div key={iP+100} className="table-plates">
                        { pos.map((e, i) => <PlateActive key={i} char={ e }/> )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CheatSheet;