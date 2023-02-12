import React, {useState} from 'react';
import './App.css';
import {BoyNameToEnum, EnumToNumberArray, Game} from "./game";
import {Phone} from "./Phone";
import {Name} from "./phoneNumbers";



const Clues = (clues: string[] | undefined) => {
    if (!clues)
        return <></>

    const headings = clues.map((hero, index) => <li key={index}>{hero}</li>)
    return <ol>{headings}</ol>
}

function App() {

    
    
    const [game,setGame] = useState<Game>(new Game("123"));
    const [clues, setClues] = useState<string[]>();
    const [clueLength, setClueLength] = useState<number>(0);
    const latestClue = clues ? clues[clues.length - 1] : undefined;

    function newClue(nameCalled: Name ) {
        
        console.log("Clue From:")
        console.log(nameCalled);
        console.log(nameCalled as Name);
        const clue= game.getClueFromBoy(nameCalled);
        console.log(clue);
        let currentClues = clues ?? [];
        currentClues?.push(clue);
        setClueLength(currentClues.length);
        setClues(currentClues);
       
    }
  
    
    

    function handlePhoneCall(number:string) {
        const boy = game.phone(number);
        newClue(boy);
    }

    return (
        <div className="App">
          
            <center><h1>DreamPhone</h1></center>
            {Clues(clues)}
            <Phone game={game} onCall={handlePhoneCall} display={latestClue}></Phone>           
           
          
        </div>

    );
}

export default App;
