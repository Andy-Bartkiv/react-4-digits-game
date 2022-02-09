// provide array of 4d numbers with no repetition from array of positions and respectful digits available
function calcUniqCombinations(arr) {
    const res = [];
    for (let d0 of arr[0]) {
        for (let d1 of arr[1]) {      
            if (!(d0).includes(d1))
                for (let d2 of arr[2]) {
                    if (!(d0+d1).includes(d2))
                        for(let d3 of arr[3]) {
                            if (!(d0+d1+d2).includes(d3))
                                res.push(d0 + d1 + d2 + d3);
        }}}}
    return res;
}
// Random element from Array
const rndElement = (arr) => arr[Math.floor(Math.random()*arr.length)];

///////////////////////// FUNCTION itself ///////////////////////////
function calcAIGuess(position, guess, minLength = 10) {
    const TEN_DIG = '0123456789'.split('').map(ch => Number(ch));
    // digits available for each position
    const gridPos = position.map(row => TEN_DIG
        .filter(d => row[d] !== '-')
        .join('')
    )
    let arrValidGuesses = [];
    let rndNumber = null;
    if (gridPos.map(num => num.length).some(len => len < minLength)) {
        arrValidGuesses = calcUniqCombinations(gridPos).filter(pos => 
            !guess.includes(pos));
        rndNumber = rndElement(arrValidGuesses);
    }
    return [rndNumber, arrValidGuesses.length];
}

export default calcAIGuess;