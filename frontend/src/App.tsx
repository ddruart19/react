import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Main from './Routing/Main';
import authContext from "./Hooks/authContext";
import HeaderNotConnected from './Components/HeaderNotConnected';


const App:React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className="App">
      <authContext.Provider value={{ authenticated, setAuthenticated }}>
        {authenticated ? <Header/> : <HeaderNotConnected/>}
        <Main></Main>
      </authContext.Provider>
    </div>
  );
}

export default App;
