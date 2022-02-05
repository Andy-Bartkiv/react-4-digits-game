import { useEffect, useState } from "react";
// import Clock from "./UI/clock/Clock";
import CountDown from "./UI/countDown/CountDown";

const Header = ({ openMM, isMyTurn, timers, setTimers }) => {

    const [timerKeys, setTimerKeys] = useState([Date.now()+1, Date.now()+2])
    const [activeTimer, setActiveTimer] = useState({my: false, opp: false});
    useEffect(() => {
        let newAT = {};
        if (isMyTurn === null) {
            newAT = {my: false, opp: false};
            setTimeout(() => {
                setTimerKeys([Date.now()+1, Date.now()+2])
            }, 500);
        } else 
            newAT = (isMyTurn)
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
                key={timerKeys[0]} 
            />

            {/* <div className="header-clock" onClick={ () => openMM() } style={{ cursor:'pointer' }}>
                <Clock/>
            </div> */}

            <div className="header-logo">
                <span>44</span>
            </div>

            <CountDown 
                timerSec={ timers.opp }
                setOutOfTime={ (isZero) => { if (isZero) setTimers({...timers, opp: 0})} }
                isActive={ activeTimer.opp } 
                key={timerKeys[1]}
            />
        </div>
    )
}

export default Header;
