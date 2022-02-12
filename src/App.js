import './App.css';
import { useState } from "react";
import MainMenu from './components/MainMenu';
import Game44 from './components/Game44';


function App() {

  const [showMainMenu, setShowMainMenu] = useState(false);
  const [difLvl, setDifLvl] = useState(null);

////////////////////////////// RENDER /////////////////////////////
  return (
    <> { (showMainMenu)
      ? <MainMenu 
          setDifLvl={ setDifLvl }
          startGame={ () => setShowMainMenu(false) }
        />
      : <Game44
          difLvl={ difLvl }
          openMainMenu={ () => setShowMainMenu(true) }
        />
    } </>
  );
}

export default App;
