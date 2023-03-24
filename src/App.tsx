import React, {useEffect, useState} from 'react';
import './App.css';
import {Game, newGameSeed} from "./game";

import {PhoneGrid} from "./PhoneGrid";
import {Name} from "./boyNames";
import {checkLocalStorageEnabled, Header} from "./Header";
import {GameMenuDialogue} from "./GameMenuDialogue";
const backUpSeed = new Game().Seed;

function App() {   
     
    const seedKey = "seedkey";
    const boysRangKey = "boysRangKey"
    let loadSeed = localStorage?.getItem(seedKey);        
    const [seed, setSeed] = useState<string>(loadSeed ?? backUpSeed);
    const [showDialogue, setShowDialogue] = useState<boolean>(!!loadSeed);
    const game:Game = startGame(seed ?? undefined);
    
    // todo move to load and start states
    function startGame(withSeed?: string):Game {
        
        let aGame = new Game(withSeed ? {seed: withSeed} : undefined);
        if(withSeed && withSeed != seed) {            
            setSeed(withSeed);
        }

        if (checkLocalStorageEnabled()) {
            // ensure state will be stored            
            aGame.onBoysRang = () => {
                localStorage.setItem(boysRangKey, JSON.stringify(aGame.boysRang));
            };
            localStorage.setItem(seedKey, aGame.Seed);
            // restore existing state            
            const boysRangBefore: Name[] = JSON.parse(localStorage.getItem(boysRangKey) || '[]') as Name[];        
            aGame.replayState(boysRangBefore);
        }
        else
        {            
            console.log("local storage is disabled");            
            aGame = new Game({seed: seed} );
        }
        console.log("Playing Seed: " + aGame.Seed)
        return aGame;
    }
   
    return (
        <>
        <Header preventRefreshOrClose={true} ></Header>
            { 
             showDialogue ? <GameMenuDialogue currentSeed={game.Seed}
                                              currentBoysRang={game.boysRang}
                                              onCloseDialogue={ ()=>setShowDialogue(false)} 
                                              onLoadGame={(seed)=> startGame(seed)} 
                                              onStartNewGame={() => startGame(newGameSeed())}/>: null}

                <div className="App">
                    <PhoneGrid  showModal={ () =>  setShowDialogue(true)}  onCall={(number) => game.phoneANumberForAClue(number)} getPhoneNumber={game.getPhoneNumber} onGuess={(name) => game.guessFromName(name)}></PhoneGrid>
                    
                </div>
               
        </> 
    );
}

export default App;
