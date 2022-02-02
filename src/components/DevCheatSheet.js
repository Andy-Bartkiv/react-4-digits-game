import { useEffect, useState } from "react";
import NumPlates from "./NumPlates";
import Plate from "./UI/plate/Plate";
import { rndStr, uniqRndStr } from "../utils/rndMethods";

function formNum(num) {
    if (typeof(num) === 'string') return num;
    return (num >= 1)
        ? '1'
        : (num !== 0) ? num.toFixed(2).slice(1) : '0'
}

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
                        }
                }
        }
    }
    return res;
}

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
                        }
                }
        }
    }
    return res;
}

const DevCheatSheet = ({ guess, res }) => {

    const header = '0123456789/';

    const createArray11x4 = () => {
        const initPos = Array(4).fill(null).map(() => [...Array(11).fill(' ')]);
        initPos.forEach((row, i) => row[row.length-1] = 'ABCD'[i]);
        return initPos;
    }
    const [position, setPosition] = useState(createArray11x4());

    const [weights, setWeights] = useState([]);
    const createArray11 = (x = ' ') => [...Array(11).fill(' ').fill(x, 10, 11)];

    const [digPresent, setDigPresent] = useState([]);

    useEffect(() => {
        if (guess.length) {
            const TEN_DIG = '0123456789'.split('').map(ch => Number(ch));
            const lastGuess = guess.slice(-1)[0].split('').map(ch => Number(ch));
            const lastRes = res.slice(-1)[0].split('').map(ch => Number(ch));
            const calcUniqDigits = (oneGuess) => [...new Set(oneGuess)];
            const uniqDigits = calcUniqDigits(lastGuess);
            let newDigPresent = [...digPresent];
            const restDigits = TEN_DIG.filter(d => !uniqDigits.includes(d));

            const newPos = [...position].map(row => [...row]);

// POSITION
            if (lastRes[0] === 0) {                 // -00 = no digit guessed
                uniqDigits.forEach(d =>
                    position.forEach((row, iR) =>
                        newPos[iR][d] = '-'));
            } else if (lastRes[1] === 0) {           // -?0 = no digit is placed correctly
                lastGuess.forEach((d, i) =>
                    newPos[i][d] = '-');
            } else if (lastRes[0] === lastRes[1]) {// XX = digits that were guessed placed correctly
                uniqDigits.forEach(d =>
                    lastGuess
                        .map((p, i) => (p === d) ? -1 : i)
                        .filter(p => p >= 0)
                        .forEach(i => newPos[i][d] = '-')
                    );
            }

    // ANALYSE Previous Guesses to update PRESENT and ABSENT
            let digCnt = 0;
            let lastIndex = res.length - 1;
            let collection = [];
            let outOfCol = [...Array(10).keys()];

            while (digCnt < 4 && lastIndex >= 0) {
                let thisGuess = guess[lastIndex].split('').map(d => Number(d));
                let thisRes = res[lastIndex].split('').map(d => Number(d));
                const thisCol = calcUniqDigits(thisGuess);
            // console.log('START', digCnt, thisRes, thisGuess, thisCol);
            // console.log(collection, outOfCol);
                if (thisCol.some(item => !collection.includes(item))) {
                    let maxRes0 = thisRes[0];
                    thisCol.forEach(d => {
                        if (!collection.includes(d)) {
                            collection.push(d);
                            // if (!digAbsent.includes(d)) {
                                digCnt += (maxRes0 > 0) ? 1 : 0;
                                maxRes0--;
                            // }
                        }
                    })
            // console.log('Inside IF', thisCol, digCnt);
            outOfCol = outOfCol.filter(d => !collection.includes(d));
                }
                lastIndex--;
                // console.log('END of WHILE', lastIndex, 'd:', digCnt, collection, outOfCol);
            }
    // If you already have all 4 numbers Make all outOfCol -ABSENT
            if (digCnt === 4 && outOfCol.length > 0 && outOfCol.length < 5 ) {
                outOfCol.forEach(d =>
                    newPos.map(row => row[d] = '-')
                );
            }
    // If obvious that all outOfCol -PRESENT
            if (digCnt < 5 && digCnt === 4 - outOfCol.length) {
                    // console.log('im in', digCnt, 4 - outOfCol.length);
                    // console.log(outOfCol);
                    const updDigPresent = [...digPresent, ...outOfCol];
                    newDigPresent = [...newDigPresent, ...calcUniqDigits(updDigPresent)];
                }

// ANALYSE POSITIONS GRID to update ABSENT and PRESENT
    // digits available for each position
            const gridPos = newPos.map(row => TEN_DIG
                    .filter(d => row[d] !== '-')
                    .join('')
                )
            // console.table(gridPos);
    // position available for each number
            const gridDig = TEN_DIG.map(d => [0,1,2,3]
                    .map(pos => (newPos[pos][d] === '-') ? '' : pos)
                    .join('') || '-'
                )



            // console.table(gridDig);
    
    
            // calc digits that are ABSENT and if their number is 6 then get 4 Present digits
            const digAbsent = gridDig
                .map((d, i) => (d === '-') ? i : -1)
                .filter(p => p >= 0);
            if (digAbsent.length === 6)
                newDigPresent.push(...TEN_DIG.filter(d => !digAbsent.includes(d)));
            // console.log('ABSENT-', digAbsent);
    // digits that are definetely present
            const updDigPresent = [...digPresent, ...newDigPresent,
                ...uniqDigits
                    .map( d => (lastRes[0] / uniqDigits.length === 1) ? d : -1 )
                    .filter(d => d >= 0)
                ];
            newDigPresent = calcUniqDigits(updDigPresent).sort((a,b) => a-b);

// UPDATE POSITIONS GRID based on ABSENT and PRESENT arrays
    // recalculate newPos if all 4 digits found
            if (newDigPresent.length === 4) {
                TEN_DIG
                    .filter(d => !newDigPresent.includes(d))
                    .forEach(d =>
                        [0,1,2,3].forEach(row =>
                            newPos[row][d] = '-'));
            }
    // recalculate newPos if any position has only one available digit
            const lastDigAtPos = () =>
                newPos
                    .map(pos => pos.slice(0, -1).filter(p => p === ' '))
                    .findIndex(pos => pos.length === 1)
            // console.log(lastDigAtPos());
    // updating newPos up to 4 times based on lastDigPos
            for (let c of '1234')
                updateRowNCol(lastDigAtPos());
            function updateRowNCol(lastDig) {
                if (lastDig >= 0) {
                    const row = lastDigAtPos();
                    const d = newPos[row].indexOf(' ');
// THERE is SOME BUG TypeError: Cannot read properties of undefined (reading '3') at updateRowNCol (DevCheatSheet.js:179:1) 
// 0101, 2323, 4545, 1054, 1052, 3052
                    // TEN_DIG.forEach(td => {
                    //     console.log('bingo per digits', row, d, td)
                    //     newPos[row][td] = (td === d) ? 'O' : '-';
                    //     if (td === d) newDigPresent.push(td);
                    // })
                    [0,1,2,3].forEach(r => {
                        // console.log('bingo per rows')
                        newPos[r][d] = (r === row) ? 'O' : '-'
                        newPos[r][10] = (r === row) ? d : newPos[r][10]
                        if (r === row && !newDigPresent.includes(d)) 
                            newDigPresent.push(d);                         
                        
                    }) 
                } else return;
            }
    // update newPos by revising Prev Guesses considering PRESENT and ABSENT
        // PRESENT
            if (newDigPresent.length > 0) {
                // console.log('REVISION on PRESENT', newDigPresent);
                const updGuess = guess.map(g => {
                    newDigPresent.forEach(d => {
                        const re = new RegExp(d, "g");
                        g = g.replace(re, '');
                    })
                    return g;
                });
                const updRes = res.map((r, i) => {
                    let res = r.split('');
                    newDigPresent.forEach(d => {
                        if (calcUniqDigits(guess[i]).includes(String(d)))
                            res[0] = res[0] - 1;
                    })
                    return res.join('');
                });
            // update newPos 
                updRes.forEach((r, i) => {
                    if (Number(r[0]) === 0) {                 // -00 = no digit guessed
                        calcUniqDigits(updGuess[i]).forEach(d =>
                            [0,1,2,3].forEach(pos =>
                                newPos[pos][d] = '-'));
                    }
                })
            }
        // ABSENT
            if (digAbsent.length > 0) {
                // console.log('REVISION on ABSENT', digAbsent);
                const updGuess = guess.map(g => {
                    digAbsent.forEach(d => {
                        const re = new RegExp(d, "g");
                        g = g.replace(re, '');
                    })
                    return g;
                });
                const updRes = [...res];
            // update newPos 
                updRes.forEach((r, i) => {
                    const newItemToNDP = Number(calcUniqDigits(updGuess[i])[0]);
                    if (Number(r[0]) !== 0 && Number(r[0]) === calcUniqDigits(updGuess[i]).length) 
                        if (!newDigPresent.includes(newItemToNDP))
                            newDigPresent.push(newItemToNDP);
                })
                console.log(newDigPresent);
            };

                
    // recalculate newPos if any digPresent has only 1 legal position
            const lastPosForDig = () =>
                newDigPresent.filter(d => 
                    (gridDig[d].length === 1 && gridDig[d] !== '-')) 
            // console.log('LPFD', lastPosForDig());
            for (let c of '1234')
                updateColumn(lastPosForDig());
            function updateColumn(lastPos) {
                // console.log('last pos for Present');
                lastPos.forEach(lp => {
                    // console.log(lp, gridDig[lp]);
                    const pos = gridDig[lp] * 1;
                    [0,1,2,3].forEach(row => newPos[row][lp] = (row === pos) ? 'O' : '-')
                    TEN_DIG.forEach(td => newPos[pos][td] = (td === lp) ? 'O' : '-');
                })
            }

// CLACULATE AVAILABLE GUESSES
    // Calculate array of possible combinations
            // console.log(gridPos.map(num => num.length));
            const gridPosNoPresent = gridPos.map(pos => {
                newDigPresent.forEach(d => pos = pos.replace(String(d), ''))
                return pos;
            })
            let arrVGnoPresent = [];
            let arrValidGuesses = [];
            if (gridPos.map(num => num.length).some(len => len < 8)) {
                // console.log(guess);
                arrValidGuesses = calcUniqCombinations(gridPos).filter(pos => !guess.includes(pos));
                arrVGnoPresent = calcUniqDoubles(gridPosNoPresent).filter(pos => !guess.includes(pos));
                const rndElement = (arr) => arr[Math.floor(Math.random()*arr.length)];
                const rndNumber = rndElement(arrValidGuesses);
                const rndNoPresent = rndElement(arrVGnoPresent);
        console.log(arrValidGuesses.length, arrVGnoPresent, rndNumber, rndNoPresent)
            }

            console.log('ABSENT-', digAbsent);
            console.log('PRESENT', newDigPresent);
            // console.table(newPos);   
            setDigPresent(newDigPresent);
            setPosition(newPos);

                        // 7928 - 5246 - 1345 - 1335 - 1331 - 1802 - 1230 ERROR (2,4) Absent , (0) Present

            // Other potentially breaking combos:
            // 0101 - 2323 - 4545 - 1054 - 1052 - 3052
            // 9012 - 8764 - 3535 - 2809 - 3125 - 1930

// WEIGHTS
            // let newWeights = createArray11(String(res.length));
            // // update weights for digits from Guess
            // uniqDigits.forEach( d => newWeights[d] = lastRes[0] / uniqDigits.length);
            // // update weights for the rest
            // // restDigits.forEach( d => newWeights[d] = (4 - lastRes[0]) / restDigits.length);

            // // r2.forEach( d => newWeights[d] = (4 - score2) / r2.length);
            // // console.log(restDigits);

            // setWeights([...weights, newWeights]);

        } else {
            setWeights([]);
            setDigPresent([]);
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
            <div className="ch-sh-weights">
                { weights.map((weight, i) =>
                    <div key={i+100} className="num-plates">
                        { weight.map((e, i) => <Plate key={i} char={ formNum(e) } charSize=".75em"/>)}
                    </div>
                )}
            </div>

        </div>
    )
}

export default DevCheatSheet
