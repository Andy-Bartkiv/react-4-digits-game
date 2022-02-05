const keepOnlyUniqDigits = (oneGuess) => [...new Set(oneGuess)];

// update 4x10 Position Array based on Guess and Res received 
function updPostionAfterGuess(position, guess, res) {
    const lastGuess = guess.slice(-1)[0].split('').map(ch => Number(ch));
    const lastRes = res.slice(-1)[0].split('').map(ch => Number(ch));
    const uniqDigits = keepOnlyUniqDigits(lastGuess);
    const newPos = [...position].map(row => [...row]);
    if (lastRes[0] === 0) {                 // -00 = no digit guessed
        uniqDigits.forEach(d =>
            [0,1,2,3].forEach((pos) =>
                newPos[pos][d] = '-'));
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
    return newPos;
}


// update ABSENT and PRESENT arrays based on Position Array
function updAbsentPresentByNewPosition(position, digPresent, digAbsent, guess, res) {
    const TEN_DIG = '0123456789'.split('').map(ch => Number(ch));
    const lastGuess = guess.slice(-1)[0].split('').map(ch => Number(ch));
    const lastRes = res.slice(-1)[0].split('').map(ch => Number(ch));
    const uniqDigits = keepOnlyUniqDigits(lastGuess);
    let newDigPresent = [...digPresent];
    let newDigAbsent = [...digAbsent];
    const newPos = [...position].map(row => [...row]);
// position available for each number
    const gridDig = TEN_DIG.map(d => [0,1,2,3]
            .map(pos => (newPos[pos][d] === '-') ? '' : pos)
            .join('') || '-'
        )
// calc digits that are ABSENT and if their number is 6 then get 4 Present digits
    newDigAbsent.push(...gridDig
        .map((d, i) => (d === '-') ? i : -1)
        .filter(p => p >= 0)
    );
    newDigAbsent = keepOnlyUniqDigits(newDigAbsent).sort((a,b) => a-b);
    if (newDigAbsent.length === 6)
        newDigPresent =[...TEN_DIG.filter(d => !newDigAbsent.includes(d))];
// digits that are definetely present
    newDigPresent.push(...uniqDigits
        .map( d => (lastRes[0] / uniqDigits.length === 1) ? d : -1 )
        .filter(d => d >= 0)
    )
    newDigPresent = keepOnlyUniqDigits(newDigPresent).sort((a,b) => a-b);
// if you have all 4 Digits Present -> outstanding 6 digits move to absent
    if (newDigPresent.length === 4)
        newDigAbsent = [...TEN_DIG.filter(d => !newDigPresent.includes(d))];
    return [newDigAbsent, newDigPresent];
}


// update PRESENT array based on Previous Guesses
function updPresentByPreviousGuesses(digPresent, guess, res) {
    let newDigPresent = [...digPresent];
    let digCnt = 0;
    let lastIndex = res.length - 1;
    let collection = [];
    let outOfCol = [...Array(10).keys()];

    while (digCnt < 4 && lastIndex >= 0) {
        let thisGuess = guess[lastIndex].split('').map(d => Number(d));
        let thisRes = res[lastIndex].split('').map(d => Number(d));
        const thisCol = keepOnlyUniqDigits(thisGuess);
        if (thisCol.some(item => !collection.includes(item))) {
            let maxRes0 = thisRes[0];
            thisCol
                .filter(d => !collection.includes(d))
                .forEach(d => {
                    collection.push(d);
                    digCnt += (maxRes0 > 0) ? 1 : 0;
                    maxRes0--;
                })
            outOfCol = outOfCol.filter(d => !collection.includes(d));
            }
        lastIndex--;
    }
// If obvious that all outOfCol -PRESENT
    if (digCnt < 5 && digCnt === 4 - outOfCol.length) {
            newDigPresent.push(...outOfCol);
            newDigPresent = keepOnlyUniqDigits(newDigPresent);
        }
    return newDigPresent;
}


// update ABSENT and Position based on Previous Guesses
function updAbsentAndPositionByPreviousGuesses(position, digAbsent, guess, res) {
    let newDigAbsent = [...digAbsent];
    const newPos = [...position].map(row => [...row]);
    let digCnt = 0;
    let lastIndex = res.length - 1;
    let collection = [];
    let outOfCol = [...Array(10).keys()];

    while (digCnt < 4 && lastIndex >= 0) {
        const thisGuess = guess[lastIndex].split('').map(d => Number(d));
        const thisRes = res[lastIndex].split('').map(d => Number(d));
        const thisCol = keepOnlyUniqDigits(thisGuess);
        if (thisCol.some(item => !collection.includes(item))) {
            const tmp = thisCol.filter(d => collection.includes(d));
            let maxRes0 = thisRes[0] - tmp.length;
            thisCol
                .filter(d => !collection.includes(d))
                .forEach(d => {
                    collection.push(d);
                    digCnt += (maxRes0 > 0) ? 1 : 0;
                    maxRes0--;
                })
            outOfCol = outOfCol.filter(d => !collection.includes(d));
            }
        lastIndex--;
    }
// If you already have all 4 numbers Make all outOfCol -ABSENT
    if (digCnt === 4 && outOfCol.length > 0 && outOfCol.length < 5 ) {
        outOfCol.forEach(d => {
            newPos.map(row => row[d] = '-')
            newDigAbsent.push(d);
        });
        newDigAbsent = keepOnlyUniqDigits(newDigAbsent);
    }
    return [newDigAbsent, newPos];
}


// 4x10 Position Array based on only PRESENT arrays
function updPositionByOnlyPresent(position, digPresent) {
    const TEN_DIG = '0123456789'.split('').map(ch => Number(ch));
    let newDigPresent = [...digPresent];
    const newPos = [...position].map(row => [...row]);

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
// updating newPos up to 4 times based on lastDigPos
    for (let c of '1234')
        updateRowNCol(lastDigAtPos());
    function updateRowNCol(lastDig) {
        if (lastDig >= 0) {
            const row = lastDigAtPos();
            const d = newPos[row].indexOf(' ');
            [0,1,2,3].forEach(r => {
                newPos[r][d] = (r === row) ? 'O' : '-'
                newPos[r][10] = (r === row) ? d : newPos[r][10]
                if (r === row && !newDigPresent.includes(d)) 
                    newDigPresent.push(d);                         
            }) 

        } else return;
    }
    return newPos;
}


// update newPos if any PRESENT digit has only 1 legal position
function updPositionByPresentLastPos(position, digPresent) {
    const TEN_DIG = '0123456789'.split('').map(ch => Number(ch));
    const newPos = [...position].map(row => [...row]);    
    // position available for each number
    const gridDig = TEN_DIG.map(d => [0,1,2,3]
        .map(pos => (newPos[pos][d] === '-') ? '' : pos)
        .join('') || '-'
    )
    const lastPosForDig = () =>
        digPresent.filter(d => 
            (gridDig[d].length === 1 && gridDig[d] !== '-')) 
    for (let c of '1234')
        updateColumn(lastPosForDig());
    function updateColumn(lastPos) {
        lastPos.forEach(lp => {
            const pos = gridDig[lp] * 1;
            [0,1,2,3].forEach(row => newPos[row][lp] = (row === pos) ? 'O' : '-')
            TEN_DIG.forEach(td => newPos[pos][td] = (td === lp) ? 'O' : '-');
            newPos[pos][10] = lp;
        })
    }
    return newPos;
}


// update newPos by revising Prev Guesses considering PRESENT and ABSENT
function updPositionByPrevGuessesAndAP(position, digPresent, guess, res) {
    let newDigPresent = [...digPresent];
    const newPos = [...position].map(row => [...row]);
    if (newDigPresent.length > 0) {
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
                if (keepOnlyUniqDigits(guess[i]).includes(String(d)))
                    res[0] = res[0] - 1;
            })
            return res.join('');
        });
    // update newPos 
        updRes.forEach((r, i) => {
            if (Number(r[0]) === 0) {          // -00 = no digit guessed
                keepOnlyUniqDigits(updGuess[i]).forEach(d =>
                    [0,1,2,3].forEach(pos =>
                        newPos[pos][d] = '-'));
        }})
    }
    return newPos;
}
// update Present by revising Prev Guesses considering PRESENT and ABSENT
function updPresentByPrevGuessesAndAP(digPresent, digAbsent, guess, res) {
    let newDigPresent = [...digPresent];
        if (digAbsent.length > 0) {
            const updGuess = guess.map(g => {
                digAbsent.forEach(d => {
                    const re = new RegExp(d, "g");
                    g = g.replace(re, '');
                })
                return g;
            });
            [...res].forEach((r, i) => {
                const newItemToNDP = Number(keepOnlyUniqDigits(updGuess[i])[0]);
                if (Number(r[0]) !== 0 && Number(r[0]) === keepOnlyUniqDigits(updGuess[i]).length) 
                    if (!newDigPresent.includes(newItemToNDP))
                        newDigPresent.push(newItemToNDP);
            })
        };
    return newDigPresent;
}

export { 
    updPostionAfterGuess, 
    updAbsentPresentByNewPosition, 
    updAbsentAndPositionByPreviousGuesses,
    updPresentByPreviousGuesses,
    updPositionByOnlyPresent,
    updPositionByPresentLastPos,
    updPositionByPrevGuessesAndAP,
    updPresentByPrevGuessesAndAP
}