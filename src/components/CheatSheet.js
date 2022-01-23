import { useEffect, useState } from "react";
import NumPlates from "./NumPlates";
import Plate from "./UI/plate/Plate";

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
    const createArray11 = (x=' ') => [...Array(11).fill(' ').fill(x,10,11)];

    useEffect(() => {
        if (guess.length) {
            const lastGuess = guess.slice(-1)[0];
            const lastRes = res.slice(-1)[0];
            const uniqDigits = [...new Set(lastGuess.split(''))];
            const restDigits = '0123456789'.split('').filter(d => !uniqDigits.includes(d));

            // const u2 = [...new Set([...guess[0].split(''), ...lastGuess.split('')])];
            // const r2 = '0123456789'.split('').filter(d => !u2.includes(d));
            // const score2 = 1*res[0][0] + 1*res[1][0]; 
            // console.log(u2, r2, score2)

            console.log(lastRes[0], lastRes[1]);
// POSITION
            if (lastRes[0] === '0') { 
            // -00 = no digit guessed 
                console.log('-00 = no digit guessed ')
                                    // MARK all numbers in a guess as '-'
                const newPos = [...position].map((row, iR) =>
                    [...row].map((el, iC) => 
                        (uniqDigits.includes(String(iC))) ? '-' : el));
                    setPosition(newPos);
            } else if (lastRes[1] === '0') { 
            // -?0 = no digit is placed correctly 
                const newPos = [...position].map((row, iR) => [...row]);
                lastGuess.split('').forEach((d, i) => newPos[i][d] = '-')
                setPosition(newPos);
            }
// WEIGHTS
            let newWeights = createArray11(String(res.length));
            // update weights for digits from Guess 
            uniqDigits.forEach( d => newWeights[d] = lastRes[0] / uniqDigits.length);
            // update weights for the rest
            restDigits.forEach( d => newWeights[d] = (4 - lastRes[0]) / restDigits.length);

            // r2.forEach( d => newWeights[d] = (4 - score2) / r2.length);
            // console.log(restDigits);

            setWeights([...weights, newWeights]);

        } else {
            setWeights([]);
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
