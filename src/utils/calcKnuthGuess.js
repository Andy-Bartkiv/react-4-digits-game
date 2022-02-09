import { rndStr, uniqRndStr } from "./rndMethods";
import calcDigitMatch from "./calcDigitMatch";

const PossibleRes = [
    '00', '10', '20', '30', '40',
    '11', '21', '31', '41',
    '22', '32', '42', 
    '33'
];

const createArrayWithRepeats = (max) => {
    const maxLength = String(max-1).length;
    return [...Array(max).keys()]
        .map(num => String(num))
        .map(str => '0'.repeat(maxLength - str.length) + str);  
}
const createArrayNoRepeats = (max) =>
    createArrayWithRepeats(max)
        .filter(str => str.split('')
            .filter((d,i) => 
                (str.slice(0,i) + str.slice(i+1)).includes(d)).length === 0
        )

const findArrOfLegalGuesses = (prevArr, guess, res) =>
    [...prevArr].filter(num => 
        calcDigitMatch(guess, num) === res);

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
    const arrS = createArrayNoRepeats(10**4);
    let resArr = [...arrS];
    if (guess.length) {
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