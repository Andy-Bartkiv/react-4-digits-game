import cls from './Plate.module.css';

import React from 'react'

const Plate = ({ char, bg='norm' }) => {

    const addCls = (bg==='teal')
        ? cls.bg_teal
        : (bg==='orange')
            ? cls.bg_orange
            : cls.bg_normal

    return (
        <span className={ [cls.plate, addCls].join(' ')}>
                { char }
        </span>
    )
}

export default Plate;
