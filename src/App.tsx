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
  
    const [seed,setSeed]= useState<string>("123456");
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [showDialogue, setShowDialogue] = useState<boolean>(false);
    

    let game:Game = new Game(seed);
    game.replayState(boysRang)   
    game.onBoysRang = () => {localStorage.setItem(boysRangKey, JSON.stringify(game.boysRang));};
            
    
    
   
    function restartGame(seed: string, boysRangBefore?: Name[]) {
        setGameStarted(true);
       
        localStorage.setItem(seedKey, seed);
        setSeed(seed);
        setInput(seed);
        game.replayState(boysRangBefore);     
        
        localStorage.setItem(boysRangKey, JSON.stringify(boysRangBefore ?? []));
            
    }
    function newGame()
    {
        const maxNumber =   9999;
        const maxPadding = "0000";
        
        const number = (Math.floor(Math.random()*maxNumber)).toString()
        console.log(number);
        const newSeed =  maxPadding.substring(number.length) + number;
       
        console.log("save seed is " +newSeed)
        restartGame(newSeed);        
    }
    function loadGame()
    {
        let loadSeed = localStorage.getItem(seedKey) ;
        console.log("load seed is " + loadSeed)
        if(loadSeed) {
            const boysRangBefore:Name[] = JSON.parse(localStorage.getItem(boysRangKey) || '[]') as Name[];
            
            restartGame(loadSeed,boysRangBefore);
            setShowDialogue(true);
        }
        else 
            newGame();
    }
    
    useEffect( () =>
    {
        loadGame(); 
    },[]);
    
    

    if(!gameStarted){return <div>Loading...</div>}   

    return (
        <>
        <Header preventRefreshOrClose={true} ></Header>
            { 
             showDialogue ? <GameMenuDialogue game={game} 
                                              onCloseDialogue={ ()=>setShowDialogue(false)}/>:

                <div className="App">
                    <PhoneGrid  showModal={ () =>  setShowDialogue(true)}  onCall={(number) => game.phoneANumberForAClue(number)} getPhoneNumber={game.getPhoneNumber} onGuess={(name) => game.guessFromName(name)}></PhoneGrid>
                    
                </div>
               }
        </> 
    );
}

export default App;
