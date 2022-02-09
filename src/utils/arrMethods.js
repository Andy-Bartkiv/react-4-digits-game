import calcDigitMatch from "./calcDigitMatch";

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

const findArrOfLegalGuesses = (prevArr, guessLast, resLast) =>
    [...prevArr].filter(num => 
        calcDigitMatch(guessLast, num) === resLast);

export { createArrayWithRepeats, createArrayNoRepeats, findArrOfLegalGuesses }