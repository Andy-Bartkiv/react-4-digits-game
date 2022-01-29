import NumPlates from "./NumPlates";
import Plate from "./UI/plate/Plate";
import PlateActive from "./UI/plateActive/PlateActive";
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
            const calcUniqDigits = (oneGuess) => [...new Set(oneGuess)];
            const uniqDigits = calcUniqDigits(lastGuess);
            let newDig1Present = [];

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

    // ANALYSE Previous Guesses
            let digCnt = 0;
            let lastIndex = res.length - 1;
            let collection = [];
            let outOfCol = [...Array(10).keys()];

            while (digCnt < 4 && lastIndex >= 0) {
                let thisGuess = guess[lastIndex].split('').map(d => Number(d));
                let thisRes = res[lastIndex].split('').map(d => Number(d));
                const thisCol = calcUniqDigits(thisGuess);
                if (thisCol.some(item => !collection.includes(item))) {
                    calcUniqDigits(thisGuess).forEach(d => {
                        if (collection.includes(d))
                            digCnt -= 1;
                        else
                            collection.push(d);
                    })
                    digCnt += Number(thisRes[0]);
                    outOfCol = outOfCol.filter(d => !collection.includes(d));
                }
                lastIndex--;
            }
    // If you already have all 4 numbers Make all outOfCol -ABSENT
            if (digCnt === 4 && outOfCol.length > 0 && outOfCol.length < 5 ) {
                outOfCol.forEach(d =>
                    newPos.map(row => row[d] = '-')
                );
            }
    // If obvious that all outOfCol -PRESENT
            if (digCnt < 5 && digCnt === 4 - outOfCol.length) {
                    const updDigPresent = [...digPresent, ...outOfCol];
                    newDig1Present = [...newDig1Present, ...calcUniqDigits(updDigPresent)];
                }

// ANALYSE POSITIONS GRID
    // digits available for each position
            const gridPos = newPos.map(row => TEN_DIG
                    .filter(d => row[d] !== '-')
                    .join('')
                )

    // position available for each number
            const gridDig = TEN_DIG.map(d => [0,1,2,3]
                    .map(pos => (newPos[pos][d] === '-') ? '' : pos)
                    .join('') || '-'
                )

    // calc digits that are ABSENT and if their number is 6 - get 4 Present digits
            const digAbsent = gridDig
                .map((d, i) => (d === '-') ? i : -1)
                .filter(p => p >= 0);
            if (digAbsent.length === 6)
                newDig1Present.push(...TEN_DIG.filter(d => !digAbsent.includes(d)));

    // digits that are definetely present
            const updDigPresent = [...digPresent, ...newDig1Present,
                ...uniqDigits
                    .map( d => (lastRes[0] / uniqDigits.length === 1) ? d : -1 )
                    .filter(d => d >= 0)
                ];
            const newDigPresent = calcUniqDigits(updDigPresent).sort((a,b) => a-b);
            setDigPresent(newDigPresent);

    // recalculate newPos if all 4 digits finded
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
    // updating newPos up to 4 times based on lastDigPos
            for (let c in '1234')
                updateRowNCol(lastDigAtPos());
            function updateRowNCol(lastDig) {
                if (lastDig >= 0) {
                    const row = lastDigAtPos();
                    const d = newPos[row].indexOf(' ');
                    [0,1,2,3].forEach(r => {
                        newPos[r][d] = (r === row) ? 'O' : '-'
                        newPos[r][10] = (r === row) ? d : newPos[r][10]
                        if (r === row) newDig1Present.push(d);
                    }) 
                } else return;
            }
    // recalculate newPos if any digPresent has only 1 legal position
            const lastPosForDig = () =>
                gridDig
                    .map((d,i) => 
                        (newDigPresent.includes(i) && d.length===1 && d !== '-') 
                            ? i : -1)
                    .filter(d => d > 0)
                    [0];
    
            for (let c in '1234')
                updateColumn(lastPosForDig());
            function updateColumn(lastPos) {
                if (lastPos >= 0) {
                    const col = lastPosForDig();
                    const pos = gridDig[col] * 1;
                    [0,1,2,3].forEach(row => newPos[row][col] = (row === pos) ? 'O' : '-')
                    TEN_DIG.forEach(td => newPos[pos][td] = (td === col) ? 'O' : '-');
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

            <div className="list-header" style={{ paddingTop:'.25em' }}>
                {/* <NumPlates str={ header } /> */}
                { header.split('').map((e, i) => <Plate key={i} char={ e } bg={'teal'}/>) }

            </div>

            <div className="cheat-sheet-table">
                <div className="table-plates">
                    {'0123456789='.split('').map((e, i) => <PlateActive key={i} char={ e } bg={'norm'}/>)}
                </div>
                { position.map((pos, iP) =>
                    <div key={iP+100} className="table-plates">
                        { pos.map((e, i) => <PlateActive key={i} char={ e } bg={'norm'}/> )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CheatSheet
