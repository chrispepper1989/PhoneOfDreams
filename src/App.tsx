import React, {useState} from 'react';
import './App.css';
import {Game} from "./game";

import {Name} from "./phoneNumbers";
import {PhoneGrid} from "./PhoneGrid";



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

    function newClue(nameCalled: Name ):string {
        
        console.log("Clue From:")
        console.log(nameCalled);
        console.log(nameCalled as Name);
        const clue= game.getClueFromBoy(nameCalled);
        console.log(clue);
        let currentClues = clues ?? [];
        currentClues?.push(clue);
        setClueLength(currentClues.length);
        setClues(currentClues);
        return clue;
       
    }        

    function handlePhoneCall(number:string):string {
        const boy = game.phone(number);
        if(boy) {
            const clue = newClue(boy);
            const boyName = Name[boy]
            return `📩 ${boyName} says: ${clue}`;
        }
        return "Sorry wrong number";
    }

    return (
        <div className="App">
                                
            <PhoneGrid onCall={handlePhoneCall} display={latestClue} getPhoneNumber={game.getPhoneNumber} onGuess={(guess) => game.guess(guess)}></PhoneGrid>
            
        </div>

    );
}

export default App;
