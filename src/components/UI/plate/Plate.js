import cls from './Plate.module.css';

const Plate = ({ char, bg='norm', width='norm' }) => {

    const addCls = (bg==='teal')
        ? cls.bg_teal
        : (bg==='orange')
            ? cls.bg_orange
            : cls.bg_normal

    const widthStyle = (width==='norm')
        ? {}
        : { width: width }

    return (
        <span className={ [cls.plate, addCls].join(' ')} style={ widthStyle }>
                { char }
        </span>
    )
}

export default Plate;
