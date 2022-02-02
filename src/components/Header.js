import { useEffect, useState } from "react";
import Clock from "./UI/clock/Clock";
import CountDown from "./UI/countDown/CountDown";

const Header = ({ isMyTurn }) => {

    const [activeTimer, setActiveTimer] = useState({my: false, opp: false});
    useEffect(() => {
        // console.log('inside HEADER', isMyTurn)
        let newAT = {};
        if (isMyTurn === null)
            newAT = {my: false, opp: false}
        else 
            newAT = (isMyTurn)
                ? {my: true, opp: false}
                : {opp: true, my: false}
        setActiveTimer(newAT);
    }, [isMyTurn])

    return (
        <div className='Client-header'>
            
            <CountDown isActive={ activeTimer.my }/>

            <div className="header-clock">
                <Clock/>
            </div>

            <CountDown isActive={ activeTimer.opp }/>
        </div>
    )
}

export default Header;
