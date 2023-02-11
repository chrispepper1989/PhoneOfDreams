import React, {ReactElement, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {EnumToNumberArray, EnumToStringArray, Game, Name} from "./game";




const Clues = (clues:string[] | undefined) => {
  if(!clues)
    return <></>
  
  const headings = clues.map((hero,index) => <li key={index}>{hero}</li>)
  return <ol>{headings}</ol>
}
function App() {
   
  const [game] = useState<Game>(new Game("123"));
  const [clues,setClues] = useState<string[]>();
    const [nameSelected, setNameSelected] = useState<Name>();

    const handleChange = (e:any) => {
        setNameSelected(e.target.value);
    };
    
  function newClue(nameCalled:Name | undefined) {
      if(nameCalled)
        game.getClue(nameCalled);
  }
    const names  = EnumToNumberArray(Name);
    const MakeItem = function(name:string, value:Name) {
        return <option value={value}>{name}</option>;
    };
    let menu:ReactElement;

  return (
    <div className="App">
      <body>
      <center><h1>DreamPhone</h1></center>
      {Clues(clues)}     
      
      <select id = "dropdown" value={nameSelected} onChange={handleChange}>
          {names.map((x:Name) => MakeItem(Name[x], x))}
      </select>
      <button onClick={() => newClue(nameSelected)}> New Clue</button>
      </body>
    </div>
          
  );
}

export default App;
