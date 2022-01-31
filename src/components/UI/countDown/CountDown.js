import { useEffect, useState } from 'react';
import TimerCarousel from '../timerCarousel/TimerCarousel';
import cls from './CountDown.module.css'

const getTimeArr = (ts) => [
    Math.floor(ts/600),
    Math.floor(ts/60),
    ':',
    Math.floor(ts/10),
    ts
];

const CountDown = ({ timerSec = 120, isActive }) => {

    const rem = .05*Math.min(.62*window.innerHeight, window.innerWidth);
    const fontSize = .75 * rem;

    const [timerID, setTimerID] = useState(null);
	const [time, setTime] = useState(timerSec);
    // const [isOn, setIsOn] = useState(isActive);
	const tick = () => setTime(t => (t > 0) ? t-1 : 0);

	useEffect( () => {
        if (isActive) setTimerID(setInterval(() => tick(), 1000));
        else clearInterval(timerID);
	}, [isActive]);

	return (
    	<div className = { (isActive) ? [cls.clock, cls.active].join(' ') : cls.clock }
            // onDoubleClick={ () => { setTime(timerSec); setIsOn(false) } }
            // onClick={ () => setIsOn(!isOn) }
        >
			{ getTimeArr(time).map((d, i) => (i !== 2)
                ?   <TimerCarousel key={i}               
                        dig={ d } 
                        cellCount={ [6,10,1,6,10][i] }
                        size={ fontSize }/>
                :   <div key={i} className={ cls.divider }></div>
            )}
		</div>
	)
};

export default CountDown;
