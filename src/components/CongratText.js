import Plate from './UI/plate/Plate';

const CongratText = ({ win }) => {

    const congratText = (win) ? 'YOU WIN' : (win === false) ? 'TRY AGAIN' : ''; 

    return (
        <div className='congrat-text'>
          {congratText.split('').map((e, i) => <Plate key={i} char={ e }/> ) }
        </div>
    )
}

export default CongratText
