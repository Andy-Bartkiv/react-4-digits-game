import { rndStr } from "../utils/rndMethods";
import { createArrayNoRepeats, findArrOfLegalGuesses } from "./arrMethods"

const calcBruteGuess = (guess, res) => {
    let resArr = [];
    if (guess.length) {
        resArr = createArrayNoRepeats(10**4);
        guess.forEach((g, i) => 
            resArr = findArrOfLegalGuesses(resArr, g, res[i])
        )
    }
    const rndNumber = resArr[Math.floor(Math.random()*resArr.length)];
    return (rndNumber) ? rndNumber : rndStr('0123456789');
}

export default calcBruteGuess;