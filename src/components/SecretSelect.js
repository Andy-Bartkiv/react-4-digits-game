import Input4D from './Input4D';
import SideSlider from './UI/sideSlider/SideSlider';
import SecretSelectText from './SecretSelectText';
import SecretSelectRules from './SecretSelectRules';

const SecretSelect = ({ visible, input, setInput }) => {

  return (
    <SideSlider visible = { visible }>
        <SecretSelectText/>
        <Input4D 
            input={ input } 
            setInput={ setInput } 
            uniqDigitsMandatory={ true }
            isMyTurn={ visible }
        />
        <SecretSelectRules/>
  </SideSlider>
  );
};

export default SecretSelect;
