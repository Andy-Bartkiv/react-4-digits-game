import { 
    updPostionAfterGuess, 
    updAbsentPresentByNewPosition, 
    updAbsentAndPositionByPreviousGuesses,
    updPresentByPreviousGuesses,
    updPositionByOnlyPresent,
    updPositionByPresentLastPos,
    updPositionByPrevGuessesAndAP,
    updPresentByPrevGuessesAndAP
} from "./chShMethods";

function calcAIChSh(position, digAbsent, digPresent, guess, res) {

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

    return [ newPos, newDigAbsent, newDigPresent ];
}

export default calcAIChSh;