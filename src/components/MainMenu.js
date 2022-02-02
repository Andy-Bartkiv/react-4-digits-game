import Plate from './UI/plate/Plate';

const MainMenu = ({ closeMM }) => {

    const text1 = 'Main menu'.toLocaleUpperCase();
    const text2 = 'Play with AI:';
    const textFooter = ('\u{00A9}'+'2022 Andy Bartkiv').toLocaleUpperCase()

    return (
        <div className='main-menu'>

            <div className='secret-select-word'>
                { text1.split('').map((e, i) => <Plate key={i} char={ e }/> )}
            </div>

            <div style={{ cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center' }} 
                onClick={ closeMM }
                className='chat-msg-text'
            >
                { text2 } 
                <span>- Senior</span>
                <span>- Middle</span>
                <span>- Junior</span>
            </div>

            <div className='secret-select-word' style={{ fontSize: '.65rem' }}>
                { textFooter.split('').map((e, i) => <Plate key={i} char={ e }/> )}
            </div>

        </div>
    );
};

export default MainMenu;
