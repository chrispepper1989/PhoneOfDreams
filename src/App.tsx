import React, {useState} from 'react';
import './App.css';
import {BoyNameToEnum, EnumToNumberArray, Game, Name} from "./game";
import {Phone} from "./Phone";



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
        const nameCalled:Name = BoyNameToEnum(e.target.value);
        setNameSelected(nameCalled);
    };
    
    function newClue(nameCalled: Name ) {
        
        console.log("Clue From:")
        console.log(nameCalled);
        console.log(nameCalled as Name);
        const clue= game.getClue(nameCalled);
        console.log(clue);
        let currentClues = clues ?? [];
        currentClues?.push(clue);
        setClueLength(currentClues.length);
        setClues(currentClues);
    }
  
    
    const MakeItem = function (name: string, value: Name) {
        return <option key={value} value={name}>{name}</option>;
    };

    function handlePhoneCall(number:string) {
        console.log("Phone: " + number);
    }

    return (
        <div className="App">
          
            <center><h1>DreamPhone</h1></center>
            {Clues(clues)}
            <Phone onCall={handlePhoneCall}></Phone>
            <h2>Speed Dial</h2>
            <select id="dropdown" value={nameSelected} onChange={handleChange}>
                {names.map((x: Name) => MakeItem(Name[x], x))}
            </select>
            <button onClick={() => newClue(nameSelected)}> Speed Dial</button>
          
        </div>

    );
}

export default App;
