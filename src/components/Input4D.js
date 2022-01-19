import { useState, useLayoutEffect, useRef } from 'react';
import Carousel from './UI/carousel/Carousel';
import { BsSafe2 } from "react-icons/bs";


const Input4D = ({ input, setInput, isMyTurn }) => {
    const divRef = useRef();
    const [dimensions, setDimensions] = useState(null);
    useLayoutEffect(() => {
      if (divRef.current)
        setDimensions({
          width: divRef.current.offsetWidth,
          height: divRef.current.offsetHeight,
          min: Math.min(divRef.current.offsetWidth, divRef.current.offsetHeight),
        });
    }, []);
  
    const [cars, setCars] = useState({ 0:1, 1:9, 2:9, 3:9 })
  
    const dim = (divRef.current) && Math.round(dimensions.width/30);
    const dim2 = (divRef.current) && Math.round((dimensions.min + dimensions.width + dimensions.height)/50);
  
    console.log(dimensions, dim, dim2);
  

    const handleSubmit = () => {
        if (!isMyTurn) return;
        setInput([...input, Object.values(cars).join('')]);
    }

    const btnStyle = 'input-button' + ((!isMyTurn) ? ' disabled' : '');

    return (
      <div className="Client-input-4D" ref={ divRef }>

        <div className={ btnStyle }
            style={{ fontSize: `${2*dim}px` }}
            onClick={ handleSubmit }
        >
          <BsSafe2/>
        </div>
  
        { (divRef.current) &&
          <div className='input-car-block'>
            { Object.keys(cars).map(carKey => 
              <Carousel key={ carKey } 
                dig={ cars[carKey] } 
                setDig={ (dgt) => setCars({...cars, [carKey]: dgt})} 
                size={ 2*dim }
              />
              )}
          </div>
        }

        {/* <div className={ btnStyle }
            style={{ fontSize: `${2*dim}px` }}
            onClick={ handleSubmit }
        >
            <BsSafe2/>
        </div> */}

      </div>
    );
}

export default Input4D;
