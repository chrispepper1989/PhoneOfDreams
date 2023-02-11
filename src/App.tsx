import React, {ReactElement, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {EnumToNumberArray, EnumToStringArray, Game, Name} from "./game";


const Clues = (clues: string[] | undefined) => {
    if (!clues)
        return <></>

    const headings = clues.map((hero, index) => <li key={index}>{hero}</li>)
    return <ol>{headings}</ol>
}

function App() {

    const names = EnumToNumberArray(Name);
    
    const [game,setGame] = useState<Game>(new Game("123"));
    const [clues, setClues] = useState<string[]>();
    const [clueLength, setClueLength] = useState<number>(0);
    const [nameSelected, setNameSelected] = useState<Name>(Name.John);

    const handleChange = (e: any) => {
        setNameSelected(e.target.value);
    };
    
    function newClue(nameCalled: Name ) {       
        const clue= game.getClue(nameCalled);
        console.log(clue);
        let currentClues = clues ?? [];
        currentClues?.push(clue);
        setClueLength(currentClues.length);
        setClues(currentClues);
    }
  
    
    const MakeItem = function (name: string, value: Name) {
        return <option key={value} value={value}>{name}</option>;
    };

    return (
        <div className="App">
          
            <center><h1>DreamPhone</h1></center>
            {Clues(clues)}

            <select id="dropdown" value={nameSelected} onChange={handleChange}>
                {names.map((x: Name) => MakeItem(Name[x], x))}
            </select>
            <button onClick={() => newClue(nameSelected)}> New Clue</button>
          
        </div>

    );
}

export default App;
