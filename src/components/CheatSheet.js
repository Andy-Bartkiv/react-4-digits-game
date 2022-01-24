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

const CheatSheet = ({ guess, res }) => {

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
            const uniqDigits = [...new Set(lastGuess)];
            const restDigits = TEN_DIG.filter(d => !uniqDigits.includes(d));

            const newPos = [...position].map(row => [...row]);

            // console.log(lastRes, lastGuess, uniqDigits, restDigits)

                        // const u2 = [...new Set([...guess[0].split(''), ...lastGuess.split('')])];
                        // const r2 = '0123456789'.split('').filter(d => !u2.includes(d));
                        // const score2 = 1*res[0][0] + 1*res[1][0];
                        // console.log(u2, r2, score2)

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

// ANALYSE POSITIONS GRID
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
            console.table(gridDig);

    // digits that are ABSENT
            const digAbsent = gridDig
                .map((d, i) => (d === '-') ? i : -1)
                .filter(p => p >= 0);
            // console.log('ABSENT-', digAbsent);

    // digits that are definetely present
            const newDigPresent = [...digPresent,
                ...uniqDigits
                    .map( d => (lastRes[0] / uniqDigits.length === 1) ? d : -1 )
                    .filter(d => d >= 0)
                ]
            const nDP = [...new Set(newDigPresent)].sort((a,b) => a-b)
            setDigPresent(nDP);
            console.log('PRESENT:', nDP);

    // recalculate newPos if all 4 digits finded
                            // if (digPresent.length === 4) console.log('1/2 Victory') -> useEffect [digPresent]
            if ([...new Set(newDigPresent)].length === 4) {
                TEN_DIG
                    .filter(d => !nDP.includes(d))
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

            for (let c in '12')
                updateRowNCol(lastDigAtPos());

            function updateRowNCol(lastDig) {
                if (lastDig >= 0) {
                    const row = lastDigAtPos();
                    const d = newPos[row].indexOf(' ');
                    TEN_DIG.forEach(td => newPos[row][td] = (td === d) ? 'O' : '-');
                    [0,1,2,3].forEach(r => {
                        newPos[r][d] = (r === row) ? 'O' : '-'
                        newPos[r][10] = (r === row) ? d : newPos[r][10]
                    }) 
                } else return;
            }
    // recalculate newPos if any digPresent has only 1 legal position
            // const lastPosForDig = () =>
            //     gridDig
            //         .map((d,i) => 
            //             (nDP.includes(i) && d.length===1 && d !== '-') 
            //                 ? i : -1)
            //         .filter(d => d > 0)
            //         [0];
    
            // console.log('LPFD', lastPosForDig(), gridDig[lastPosForDig()]);
            // for (let c in '12')
            //     updateColumn(lastPosForDig());

            // function updateColumn(lastPos) {
            //     if (lastPos >= 0) {
            //         const col = lastPosForDig();
            //         const pos = gridDig[col] * 1;
            //         // console.log(col, pos);
            //         [0,1,2,3].forEach(row => newPos[row][col] = (row === pos) ? 'O' : '-')
            //         TEN_DIG.forEach(td => newPos[pos][td] = (td === col) ? 'O' : '-');
            //     } else return;
            // }


            // console.table(newPos);   
            setPosition(newPos);

// WEIGHTS
            let newWeights = createArray11(String(res.length));
            // update weights for digits from Guess
            uniqDigits.forEach( d => newWeights[d] = lastRes[0] / uniqDigits.length);
            // update weights for the rest
            // restDigits.forEach( d => newWeights[d] = (4 - lastRes[0]) / restDigits.length);

            // r2.forEach( d => newWeights[d] = (4 - score2) / r2.length);
            // console.log(restDigits);

            setWeights([...weights, newWeights]);

        } else {
            setWeights([]);
            setDigPresent([]);
            setPosition(createArray11x4());
        }
    }, [res])

    return (
        <div className="ch-sh-wrap right">

            <div className="ch-sh-header">
                <NumPlates str={ header } />
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

export default CheatSheet
