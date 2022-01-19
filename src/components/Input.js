import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import { useEffect, useState } from "react";

const Input = ({ input, setInput, isMyTurn }) => {

    const [fourDig, setFourDig] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isMyTurn) return;
        if (fourDig.length !== 4) return;
        if (isNaN(Number(fourDig))) return;
        setInput([...input, fourDig]);
        setFourDig('');
    }

    return (
        <form className='Client-input' onSubmit={ handleSubmit }>
            <MyButton style={{ width: '50%', '--sec-color': (!isMyTurn) ? 'red' : 'orange' }}>
                Submit
            </MyButton>
            <MyInput style={{ width: '50%' }}
                type="text" 
                placeholder="1234" 
                value={ fourDig } 
                onChange= { (e) => setFourDig(e.target.value) }
            />
        </form>
    )
}

export default Input
