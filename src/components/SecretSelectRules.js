import { useState } from "react";
import Plate from "./UI/plate/Plate";

const SecretSelectRules = () => {
    
    const [showRules, setShowRules] = useState(false);

    const text = [];
    text.push("Each player picks a 4-digit secret number.");
    text.push("The digits must be all different.");
    text.push("Then, in turn, the players try to guess their opponent's number who in return provides the number of matches in 2-digit format.");
    text.push("The first digit provides information about how many digits from player guess match opponent secret number.");
    text.push("The second digit - how many digits from player guess match their right positions in secret number.");
    text.push("The first player to reveal the other's secret number (get 44 in response to his guess) wins the game.");

    return (
        <div className='secret-select-text bottom-hint'>
            {(!showRules)
            ? <div onClick={ () => setShowRules(true) }><Plate char='i'/></div>
            : <div>
                <div style={{ position:'absolute', top:'.25em', left:'.25em'}}
                    onClick={ () => setShowRules(false) }>
                    <Plate style={{width:'5em'}} char='RU'/>
                </div>
                <div style={{ position:'absolute', top:'.25em', right:'.25em'}}
                    onClick={ () => setShowRules(false) }>
                    <Plate char='X'/>
                </div>
                { text.map((p,i) => <p key={i}>{ p }</p>)}
            </div>
        }
        </div>
    )
};

export default SecretSelectRules;
