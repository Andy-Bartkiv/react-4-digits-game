import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import { useState } from "react";

const Input = ({ input, setInput }) => {

    const [fourDig, setFourDig] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isNaN(Number(fourDig)) || fourDig.length !== 4) return;
        setInput([...input, fourDig]);
        setFourDig('');
    }

    return (
        <form className='App-input' onSubmit={ handleSubmit }>
            <MyButton style={{ width: '50%', borderRadius: '.5em' }}>Submit</MyButton>
            <MyInput style={{ width: '50%', borderRadius: '.5em' }}
                // required
                type="text" 
                placeholder="1234" 
                value={ fourDig } 
                onChange= { (e) => setFourDig(e.target.value) }
            />
        </form>
    )
}

export default Input