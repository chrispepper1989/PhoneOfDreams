import React, { useState} from 'react';
import './App.css';
import {Game, GameState, newGameSeed} from "./game";

import {PhoneGrid} from "./PhoneGrid";
import { Header} from "./Header";
import {GameMenuDialogue} from "./GameMenuDialogue";
import useLocalStorageState from "./customHooks";

function App() {       
    
    const gameStateKey = "gameState";
    const [state, setState] = useLocalStorageState<GameState>(gameStateKey, {seed:newGameSeed()});
    const gamePlayedBefore = !!(state?.seed);
    const [showDialogue, setShowDialogue] = useState<boolean>(gamePlayedBefore);
       
    // create game
    // note react creates this every time the state changes
    // which now includes everytime a boy is rang...
    const game:Game = new Game(state);
    console.log("re-render"); 
    game.onBoysRang = () => {
        //todo move this into where it is actually needed to re-render
        setState(game.getSaveState());
    };
    
    // load a game from a seed
    function loadGame(withSeed: string) {
        //this triggers a state change which triggers a re-render
        setState({seed:withSeed});       
    }
    // create a new game by loading from a new seed
    function newGame(){
        loadGame(newGameSeed());
    }
   
    return (
        <>
        <Header preventRefreshOrClose={true} />
        {showDialogue ? <GameMenuDialogue currentSeed={game.Seed}
                                      currentBoysRang={game.boysRang}
                                      onCloseDialogue={ ()=>setShowDialogue(false)} 
                                      onLoadGame={(seed)=> loadGame(seed)} 
                                      onStartNewGame={() => newGame()}/>: null}       
        
        <PhoneGrid  showModal={ () =>  setShowDialogue(true)}  
                    onCall={(number) => game.phoneANumberForAClue(number)} 
                    getPhoneNumber={game.getPhoneNumber} 
                    onGuess={(name) => game.guessFromName(name)}/>
       
        </> 
    );
}

export default App;
