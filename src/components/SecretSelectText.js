import Plate from './UI/plate/Plate';

const SecretSelectText = () => {

    const text = 'Pick your Secret Number'.toLocaleUpperCase();

    return (
        <div className='secret-select-text'>
          {text.split(' ').map((word, iW) => 
            <div key={iW} className='secret-select-word'>
              { word.split('').map((e, i) => <Plate key={i} char={ e }/> )}
            </div> 
            )
          }
        </div>
    )

}

export default SecretSelectText
