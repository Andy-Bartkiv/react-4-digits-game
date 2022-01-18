import Clock from "./UI/clock/Clock";

const Header = () => {

    return (
        <div className='App-header'>
        
            {/* <div></div>
            
            <h2>1-2-3-4</h2> */}

            <div className="header-clock">
                <Clock/>
            </div>
        
        </div>
    )
}

export default Header;
