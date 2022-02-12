import { uniqRndStr } from "./rndMethods";
import { 
    createArrayWithRepeats, 
    createArrayNoRepeats, 
    findArrOfLegalGuesses 
} from "./arrMethods"

const PossibleRes = [
    '00', '10', '20', '30', '40',
    '11', '21', '31', '41',
    '22', '32', '42', 
    '33'
];

const minimax = (resArr) => {
    const arrAll = createArrayWithRepeats(10**4);
    const arrOfMax = arrAll.map(g => 
        Math.max(...PossibleRes.map(r => 
            findArrOfLegalGuesses(resArr, g, r).length))
    );
    const minOfArr = Math.min(...arrOfMax);
    const newGuessArray = arrAll
        .filter((str, i) => arrOfMax[i] === minOfArr )
        .filter(str => resArr.includes(str));
    return (newGuessArray.length) 
        ? newGuessArray[0] 
        : arrAll[arrOfMax.indexOf(minOfArr)];
}

function calcKnuthGuess(guess, res) {
    if (guess.length) {
        let resArr = createArrayNoRepeats(10**4);
        guess.forEach((g, i) => {
            resArr = findArrOfLegalGuesses(resArr, g, res[i])
            console.log(g, res[i]);
        })
        return minimax(resArr);
    } else {
        return uniqRndStr('0123456789', 2).repeat(2);
    }
}

export default calcKnuthGuess;