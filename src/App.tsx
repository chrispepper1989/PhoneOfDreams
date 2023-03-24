import React, {useEffect, useState} from 'react';
import './App.css';
import {Game} from "./game";

import {PhoneGrid} from "./PhoneGrid";
import {Name} from "./boyNames";
import {Header} from "./Header";
import {GameMenuDialogue} from "./GameMenuDialogue";

function App() {
   
     
    const seedKey = "seedkey";
    const boysRangKey = "boysRangKey"
    let loadSeed = localStorage.getItem(seedKey) ;
    const boysRangBefore:Name[] = JSON.parse(localStorage.getItem(boysRangKey) || '[]') as Name[];
    //const [game, setGame]= useState<Game>(startGame(loadSeed ?? undefined, boysRangBefore));
    const game = startGame(loadSeed ?? undefined, boysRangBefore);
    const [showDialogue, setShowDialogue] = useState<boolean>(!!loadSeed);

    function startGame(seed?: string , boysRangBefore?: Name[]) {
        const game = new Game(seed );
        game.replayState(boysRangBefore);
        localStorage.setItem(seedKey, game.Seed);
        localStorage.setItem(boysRangKey, JSON.stringify(boysRangBefore ?? []));
        game.onBoysRang = () => {localStorage.setItem(boysRangKey, JSON.stringify(game.boysRang));};
        console.log("Playing Seed: " + game.Seed)
        return game;
    }
    if(!game) return <h1>Game Error</h1>;
    return (
        <>
        <Header preventRefreshOrClose={true} ></Header>
            { 
             showDialogue ? <GameMenuDialogue currentSeed={game.Seed}
                                              currentBoysRang={game.boysRang}
                                              onCloseDialogue={ ()=>setShowDialogue(false)} 
                                              onLoadGame={(seed)=>(startGame(seed))} 
                                              onStartNewGame={() => (startGame())}/>: null}

                <div className="App">
                    <PhoneGrid  showModal={ () =>  setShowDialogue(true)}  onCall={(number) => game.phoneANumberForAClue(number)} getPhoneNumber={game.getPhoneNumber} onGuess={(name) => game.guessFromName(name)}></PhoneGrid>
                    
                </div>
               
        </> 
    );
}

export default App;
