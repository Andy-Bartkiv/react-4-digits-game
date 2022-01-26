import { useState, useLayoutEffect, useRef } from 'react';
import Carousel from './UI/carousel/Carousel';
import { BsSafe2 } from "react-icons/bs";

const Input4D = ({ input, setInput, isMyTurn, win=null, uniqDigits=false }) => {
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
    
    const initInput = (input.length) 
      ? { 0:1*input[0], 1:1*input[1], 2:1*input[2], 3:1*input[3] } 
      : { 0:0, 1:0, 2:1, 3:1 };
    const [cars, setCars] = useState(initInput)
  
    const dim = (divRef.current) && Math.round(dimensions.width/30);
    const dim2 = (divRef.current) && Math.round((dimensions.min + dimensions.width + dimensions.height)/50);
  
    // console.log(dimensions, dim, dim2, isMyTurn);

    const handleSubmit = () => {
      if (isMyTurn) {
        const res = Object.values(cars).join('');
        const notQniqInd = [];
        if (uniqDigits) {
          for (let d of res) {
            const i = res.indexOf(d);
            const res3 = res.slice(0, i) + res.slice(i+1);
            if (res3.includes(d)) notQniqInd.push(i);
          }
          console.log('NOT ALL DIGITS ARE UNIQ', res, notQniqInd.map(i => res[i]));
          if (notQniqInd.length > 0) return;
        } 
        setInput([...input, res]);
      } 
    }

    const btnStyle = 'input-button' + ((isMyTurn) ? '' : ' disabled');
    const inputStyle ='Client-input-4D' + ((win !== true && win !== false) ? '' : ' endgame');

    return (
      <div className={ inputStyle } ref={ divRef }>

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

      </div>
    );
}

export default Input4D;
