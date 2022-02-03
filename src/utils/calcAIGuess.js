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
// provide array of 4d numbers only with repetition digits from array of positions and respectful digits available
function calcUniqDoubles(arr) {
    const res = [];
    for (let d0 of arr[0]) {
        for (let d1 of arr[1]) {      
            // if (!(d0).includes(d1))
                for (let d2 of arr[2]) {
                    if ((d0+d1).includes(d2))
                        for(let d3 of arr[3]) {
                            if ((d0+d1).includes(d3))
                                res.push(d0 + d1 + d2 + d3);
        }}}}
    return res;
}
// Random element from Array
const rndElement = (arr) => arr[Math.floor(Math.random()*arr.length)];

///////////////////////// FUNCTION itself ///////////////////////////
function calcAIGuess(position, digPresent, guess) {

    const TEN_DIG = '0123456789'.split('').map(ch => Number(ch));

    // digits available for each position
    const gridPos = position.map(row => TEN_DIG
        .filter(d => row[d] !== '-')
        .join('')
    )
    // console.table(gridPos);
    // position available for each number
    const gridDig = TEN_DIG.map(d => [0,1,2,3]
        .map(pos => (position[pos][d] === '-') ? '' : pos)
        .join('') || '-'
    )
    const gridPosNoPresent = gridPos.map(pos => {
        digPresent.forEach(d => pos = pos.replace(String(d), ''))
        return pos;
    })
    let arrVGnoPresent = [];
    let arrValidGuesses = [];
    let rndNumber, rndNoPresent;
    if (gridPos.map(num => num.length).some(len => len < 8)) {
        arrValidGuesses = calcUniqCombinations(gridPos).filter(pos => !guess.includes(pos));
        arrVGnoPresent = calcUniqDoubles(gridPosNoPresent).filter(pos => !guess.includes(pos));
        rndNumber = rndElement(arrValidGuesses);
        rndNoPresent = rndElement(arrVGnoPresent);
    }
    return [rndNumber, rndNoPresent, arrValidGuesses.length, arrVGnoPresent.length]
}

export { calcAIGuess }