import { useEffect, useState } from "react";
import CountDown from "./UI/countDown/CountDown";

const Header = ({ openMM, isMyTurn, timers, setTimers }) => {

    const [activeTimer, setActiveTimer] = useState({my: false, opp: false});
    useEffect(() => {
        const newAT = (isMyTurn === null)
            ? {my: false, opp: false}
            : (isMyTurn)
                ? {my: true, opp: false}
                : {opp: true, my: false}
        setActiveTimer(newAT);
    }, [isMyTurn]);

    return (
        <div className='Client-header'>
            
            <CountDown 
                timerSec={ timers.my } 
                setOutOfTime={ (isZero) => { if (isZero) setTimers({...timers, my: 0})} }
                isActive={ activeTimer.my } 
            />

                        
            <div className="header-logo"
                onClick={ () => { setTimers({opp:0, my: 0}); openMM(); }}
            > 
                <span>44</span>
            </div>

            <CountDown 
                timerSec={ timers.opp }
                setOutOfTime={ (isZero) => { if (isZero) setTimers({...timers, opp: 0})} }
                isActive={ activeTimer.opp } 
            />
        </div>
    )
}

export default Header;
