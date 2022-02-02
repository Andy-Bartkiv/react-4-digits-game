import { useEffect, useState } from "react";
import { FiMessageCircle} from 'react-icons/fi';
import { BiMessageSquareDots } from 'react-icons/bi';

const Navbar = ({ chat, toggleChat, restartGame, cheatSheet, toggleCheatSheet, msgArr }) => {

    const [msgCnt, setMsgCnt] = useState(false);

    useEffect(() => {
        const len = msgArr.length;
        if (len && msgArr[len-1].author === 'AI')
            setMsgCnt(true);
    }, [msgArr])

    function handleChatClick() {
        setMsgCnt(false); 
        toggleChat();
    }

    return (
        <div className='Client-navbar'>
            <li onClick={ handleChatClick }>
                { (chat) 
                    ? 'My Guess' 
                    : 'Chat' 
                }
                { !chat && msgCnt &&
                    <span className="new-msg-icon"> <BiMessageSquareDots/>  </span> 
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
