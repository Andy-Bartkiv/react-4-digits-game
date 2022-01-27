import { useState } from "react"

const Navbar = ({ chat, toggleChat, restartGame, cheatSheet, toggleCheatSheet }) => {

    const [msgCnt, setMsgCnt] = useState(2);

    const chatText = (msgCnt === 0) ? 'Chat' : 'Chat - ' + msgCnt; 

    function handleChatClick() {
        if (!chat) setMsgCnt(0); 
        toggleChat();
    }

    return (
        <div className='Client-navbar'>
            <li onClick={ handleChatClick }>
                { (chat) 
                    ? 'My Guess' 
                    : chatText }
            </li>
            <li onClick={ restartGame }>
                Menu
            </li>
            <li onClick={ toggleCheatSheet }>
                { (cheatSheet) ? 'Opp Guess' : 'Hint' }
            </li>
        </div>
    )
}

export default Navbar
