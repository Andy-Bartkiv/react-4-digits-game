const Navbar = ({ restartGame, toggleCheatSheet }) => {
    return (
        <div className='Client-navbar'>
            <li>Menu</li>
            {/* <li onClick={ (isMyTurn) ? restartGame : null }>Game</li> */}
            <li onClick={ restartGame }>Game</li>
            <li onClick={ toggleCheatSheet }>Hint</li>
        </div>
    )
}

export default Navbar
