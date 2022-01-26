import Plate from './UI/plate/Plate';

const CongratText = ({ win }) => {

    const congratText = (win) ? 'YOU WIN' : (win === false) ? 'TRY AGAIN' : ''; 
    const cls = 'congrat-text' + ((win) ? ' win' : ' loose');

    return (
        <div className={ cls }>
          {congratText.split('').map((e, i) => <Plate key={i} char={ e }/> ) }
        </div>
    )
}

export default CongratText
