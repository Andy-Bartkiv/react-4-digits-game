import { useState } from "react";
import { FiMessageCircle} from 'react-icons/fi';
import { BiMessageSquareDots } from 'react-icons/bi';

const Navbar = ({ chat, toggleChat, restartGame, cheatSheet, toggleCheatSheet }) => {

    const [msgCnt, setMsgCnt] = useState(2);

    function handleChatClick() {
        if (!chat) setMsgCnt(0); 
        toggleChat();
    }

    return (
        <div className='Client-navbar'>
            <li onClick={ handleChatClick }>
                { (chat) 
                    ? 'My Guess' 
                    : 'Chat' }
                { !chat && msgCnt > 0 &&
                    <>
                    {/* <span className="new-msg-indicator">+{ msgCnt }</span>  */}
                    <span className="new-msg-icon"> <BiMessageSquareDots/>  </span> 
                    </>
                }
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
