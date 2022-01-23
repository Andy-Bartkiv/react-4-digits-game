import cls from './Plate.module.css';

import React from 'react'

const Plate = ({ char, charSize = '1em' }) => {
    return (
        <span className={ cls.plate }>
            <span style={{ fontSize: charSize}}>
                { char }
            </span>
        </span>
    )
}

export default Plate;
