import NumPlates from "./NumPlates";
import Plate from "./UI/plate/Plate";
import { useState, useEffect } from "react";

const CheatSheet = ({ guess, res }) => {

    // const header = '0123456789/';
    const header = 'HINT';

    const createArray11x4 = () => {
        const initPos = Array(4).fill(null).map(() => [...Array(11).fill(' ')]);
        initPos.forEach((row, i) => row[row.length-1] = '????'[i]);
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

// ANALYSE POSITIONS GRID
    // digits available for each position

    // position available for each number
            const gridDig = TEN_DIG.map(d => [0,1,2,3]
                    .map(pos => (newPos[pos][d] === '-') ? '' : pos)
                    .join('') || '-'
                )

    // digits that are ABSENT
            const digAbsent = gridDig
                .map((d, i) => (d === '-') ? i : -1)
                .filter(p => p >= 0);

    // digits that are definetely present
            const newDigPresent = [...digPresent,
                ...uniqDigits
                    .map( d => (lastRes[0] / uniqDigits.length === 1) ? d : -1 )
                    .filter(d => d >= 0)
                ]
            const nDP = [...new Set(newDigPresent)].sort((a,b) => a-b)
            setDigPresent(nDP);

    // recalculate newPos if all 4 digits finded
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

            for (let c in '1234')
                updateRowNCol(lastDigAtPos());

            function updateRowNCol(lastDig) {
                if (lastDig >= 0) {
                    const row = lastDigAtPos();
                    const d = newPos[row].indexOf(' ');
                    TEN_DIG.forEach(td => newPos[row][td] = (td === d) ? '+' : '-');
                    [0,1,2,3].forEach(r => {
                        newPos[r][d] = (r === row) ? '+' : '-'
                        newPos[r][10] = (r === row) ? d : newPos[r][10]
                    }) 
                } else return;
            }

            // console.table(newPos);   
            setPosition(newPos);

        } else {
            setWeights([]);
            setDigPresent([]);
            setPosition(createArray11x4());
        }
    }, [res])



    return (
        <div className="cheat-sheet">

            <div className="list-header">
                {/* <NumPlates str={ 'O' } /> */}
                <NumPlates str={ header } />
                {/* <NumPlates str={ 'X' } /> */}
            </div>

            <div className="cheat-sheet-table">
                <div className="table-plates">
                    {'0123456789>'.split('').map((e, i) => <Plate key={i} char={ e }/>)}
                </div>
                { position.map((pos, iP) =>
                    <div key={iP+100} className="table-plates">
                        { pos.map((e, i) => <Plate key={i} char={ e }/> )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CheatSheet
