import MsgList from "./MsgList";
import { MdSend } from 'react-icons/md';
import { useState, useEffect } from "react";

const ChatTab = ({ msgArr, setMsgArr }) => {

    const [textInput, setTextInput] = useState('');

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
            <form className='chat-input-form'
                onSubmit={ handleSubmit }
            >
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
