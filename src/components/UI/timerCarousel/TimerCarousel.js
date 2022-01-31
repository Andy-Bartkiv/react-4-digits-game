import { useState } from 'react';
import cls from './TimerCarousel.module.css';

const TimerCarousel = ({ dig, cellCount, size }) => {

    const [cells, setCells] = useState([...Array(cellCount).keys()]);
    const [radius, setRadius] = useState( () =>
        Math.round( size / Math.tan(Math.PI / cellCount) ));
    const [cellsStyle, setCellsStyle] = useState( cells.map(cell => 
        ({ transform: `rotateX(${cell * -360/cellCount}deg) translateZ(${radius}px)`})
    ));
    const roatateCar = (val) => `translateZ(${-radius}px) rotateX(${(val/cellCount*360)}deg)`; 

    return (
        <div className={ cls.container }>
            <div className={ cls.scene }>        
                <div className={ cls.carousel } style = {{ transform: roatateCar(dig) }}>
                    { cells.map( (cell) =>
                        <div key={ cell } 
                            className={ cls.carousel__cell }
                            style = {{ transform: cellsStyle[cell].transform }}
                        >
                            <span>{ cell }</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

TimerCarousel.defaultProps = {
    cellCount: 10,
    size: 15, 
}

export default TimerCarousel;
