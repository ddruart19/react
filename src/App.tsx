import React, {  } from 'react';
import './App.css';
import Header from './Components/Header';
import Main from './Routing/Main';

const App:React.FC = () => {
  return (
    <div className="App">
      <Header></Header>
      
      <Main></Main>
    </div>
  );
}

export default App;
