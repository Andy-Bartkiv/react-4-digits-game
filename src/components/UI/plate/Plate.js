import cls from './Plate.module.css';

import React from 'react'

const Plate = ({ char }) => {
    return (
        <span className={ cls.plate }>
            { char }
        </span>
    )
}

export default Plate;
