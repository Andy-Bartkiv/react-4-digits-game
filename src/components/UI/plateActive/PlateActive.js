import { useState } from 'react';
import cls from './PlateActive.module.css';

const PlateActive = ({ char }) => {

    // const ST = ['norm', 'orange', 'teal'];
    const CL = [cls.bg_normal, cls.bg_orange, cls.bg_teal];
    const [index, setIndex] = useState(0);

    return (
        <span className={ [cls.plate, CL[index%3]].join(' ')}
            onClick={ () => setIndex(index + 1)}
        >
                { char }
        </span>
    )
}

export default PlateActive
