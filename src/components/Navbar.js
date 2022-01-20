const Navbar = ({ isMyTurn, restartGame }) => {
    return (
        <div className='Client-navbar'>
            <li>Menu</li>
            <li onClick={ (isMyTurn) ? restartGame : null }>Game</li>
            <li>Hint</li>
        </div>
    )
}

export default Navbar
