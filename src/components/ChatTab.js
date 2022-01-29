import NumPlates from "./NumPlates";
import Plate from "./UI/plate/Plate";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import MsgList from "./MsgList";
import { MdSend } from 'react-icons/md';
import { useState, useEffect } from "react";

const ChatTab = () => {

    const [textInput, setTextInput] = useState('');
    const [msgArr, setMsgArr] = useState([
        { id: '1111', author: 'Me', text: 'Hello AI!' },
        { id: '2222', author: 'AI', text: 'Greetings, master!' },
        { id: '3333', author: 'Me', text: 'How are you today?' },
        { id: '4444',author: 'AI', text: 'Awesome!' },
    ]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (textInput.length < 1) return;
        setMsgArr([...msgArr, {
            id: Date.now(),
            author: 'Me',
            text: textInput
        }]);
        setTextInput('');
    }


    return (
        <div className="cheat-sheet client-chat">
            <form className='chat-input-form'>

                <div className="chat-btn"
                    onClick={ handleSubmit }
                >
                    <MdSend/>
                </div>

                <input className="chat-input"
                    type="text" 
                    placeholder="..." 
                    value={ textInput } 
                    onChange= { (e) => setTextInput(e.target.value) }
                />

            </form>

        <MsgList msgArr={ msgArr }/>
            
        </div>
    )
}

export default ChatTab
