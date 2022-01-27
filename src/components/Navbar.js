import { useState } from "react"

const Navbar = ({ toggleChat, restartGame, toggleCheatSheet }) => {

    const [hint, setHint] = useState(false);
    const [chat, setChat] = useState(false);

    return (
        <div className='Client-navbar'>
            <li onClick={ () => { setChat(!chat); toggleChat(); }}>
                { (chat) ? 'Guess' : 'Chat' }
            </li>
            <li onClick={ restartGame }>
                Menu
            </li>
            <li onClick={ () => { setHint(!hint); toggleCheatSheet(); }}>
                { (hint) ? 'Watch' : 'Hint' }
            </li>
        </div>
    )
}

export default Navbar
