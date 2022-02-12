import Plate from './UI/plate/Plate';

const MainMenu = ({ setDifLvl, startGame }) => {

    const text1 = 'Main menu'.toLocaleUpperCase();
    const text2 = 'Practice with AI:';
    const text3 = 'Play PvP online'
    const textFooter = ('\u{00A9}'+'2022 Andy Bartkiv').toLocaleUpperCase()

    return (
        <div className='main-menu'>

            <div className='secret-select-word' style={{ color:'#ffa50099' }}>
                { text1.split('').map((e, i) => <Plate key={i} char={ e }/> )}
            </div>

            <div className='chat-msg-text'
                style={{ cursor:'pointer', display:'flex', flexDirection:'column', 
                    alignItems:'center' }} 
                onClick={ () => { setDifLvl('middle'); startGame(); }}
            >
                { text2 } 
                <span>- Senior -</span>
                <span>- Middle -</span>
                <span>- Junior -</span>
            </div>

            <div style={{ cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center' }} 
                // onClick={ }
                className='chat-msg-text'
            >
                { text3 } 
                <span>- LogIn -</span>

            </div>

            <div className='secret-select-word' style={{ fontSize: '.65rem' }}>
                { textFooter.split('').map((e, i) => <Plate key={i} char={ e }/> )}
            </div>

        </div>
    );
};

export default MainMenu;
