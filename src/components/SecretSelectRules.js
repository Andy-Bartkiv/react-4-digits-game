import { useState } from "react";
import Plate from "./UI/plate/Plate";

const SecretSelectRules = () => {
    
    const [showRules, setShowRules] = useState(false);
    const [rus, setRus] = useState(false);

    const textEN = [];
    textEN.push("Each player picks a 4-digit secret number.");
    textEN.push("The digits must be all different.");
    textEN.push("Then, in turn, the players try to guess their opponent's number who in return provides the number of matches in 2-digit format.");
    textEN.push("The first digit contains information about how many digits from the player's guess match the opponent's secret number.");
    textEN.push("The second digit shows how many digits from the player's guess match their correct positions in the secret number.");
    textEN.push("The first player to reveal the other's secret number (gets 44 in response to his guess) wins the game.");

    const textRU = [];
    textRU.push("Каждый игрок устанавливает 4-значный секретный код.");
    textRU.push("Все цифры должны быть разными.");
    textRU.push("Затем, по очереди, игроки пытаются угадать код своего противника, который в ответ предоставляет количество совпадений в 2-значном формате.");
    textRU.push("Первая цифра показывает сколько цифр из догадки игрока присутствует в секретным коде противника.");
    textRU.push("Вторая цифра - сколько цифр из догадки соответствуют их правильным позициям в секретном коде.");
    textRU.push("Первый игрок, который угадает секретный код другого (получит 44 в ответ на догадку), побеждает.");

    const text = (rus) ? textRU : textEN;
    const styleP = (rus) ? 'rus' : '';

    return (
        <div className='secret-select-text bottom-hint'>
            { (!showRules)
            ? 
                <div className="info-btn" onClick={ () => setShowRules(true) }>
                    <Plate width='1.5em' char='i'/>
                </div>
            : 
                <div>
                    <div className="control-btn" style={{ left:'.25em'}}
                        onClick={ () => setRus(!rus) }>
                        <Plate width='1.75em' char={(rus)?'EN':'RU'}/>
                    </div>
                    <div className="control-btn" style={{ right:'.25em'}}
                        onClick={ () => setShowRules(false) }>
                        <Plate width='1.5em' char='X'/>
                    </div>
                    { text.map((txt,i) => 
                        <p key={i} 
                            className={ [styleP, (i===0)?'first':''].join(' ') }
                        >
                            { txt }
                        </p>
                    )}
                </div>
        }
        </div>
    )
};

export default SecretSelectRules;
