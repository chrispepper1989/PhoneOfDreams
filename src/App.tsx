import React, {useEffect, useState} from 'react';
import './App.css';
import { Game} from "./game";

import {PhoneClue, PhoneGrid} from "./PhoneGrid";
import {Helmet} from "react-helmet";
import {Name} from "./boyNames";


function App() {
    const seedKey = "seedkey";
    const boysRangKey = "boysRangKey"
  
    const [seed,setSeed]= useState<string>("123456");
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [showSureModal, setShowSureModal] = useState<boolean>(false);
    const [showDebug, setShowDebug] = useState<boolean>(false);
    const [showLog, setShowLog] = useState<boolean>(false);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [boysRang, setBoysRang] = useState<Name[]>([]);
    const [input, setInput] = useState('');
    let game:Game = new Game(seed);    
    
    
    function updateBoysRang(boy:Name)
    {
        if(!boy)
            return;
        boysRang.push(boy);
        setBoysRang(boysRang);
        localStorage.setItem(boysRangKey, JSON.stringify(boysRang));
    }
        
    
    useEffect(() => {
        function alertUser(ev:any) {
            ev.preventDefault();
            return ev.returnValue = 'Are you sure you want to close?';
        }

        window.addEventListener('beforeunload', alertUser)        
       
        return () => {
            window.removeEventListener('beforeunload', alertUser)            
        }
    })
    function setGame(seed: string, boysRangBefore?: Name[]) {
        setGameStarted(true);
        localStorage.setItem(seedKey, seed);
        setSeed(seed);
        setInput(seed);
        game = new Game(seed);
        if(boysRangBefore)
        {
            boysRangBefore.forEach( (boy) => game.getClueFromBoy(boy));
        }
        setBoysRang(boysRangBefore ?? []);
        localStorage.setItem(boysRangKey, JSON.stringify(boysRang));
            
    }
    function newGame()
    {
        const maxNumber =   9999;
        const maxPadding = "0000";
        
        const number = (Math.floor(Math.random()*maxNumber)).toString()
        console.log(number);
        const newSeed =  maxPadding.substring(number.length) + number;
       
        console.log("save seed is " +newSeed)
        setGame(newSeed);        
    }
    function loadGame()
    {
        let loadSeed = localStorage.getItem(seedKey) ;
        console.log("load seed is " + loadSeed)
        if(loadSeed) {
            const boysRangBefore:Name[] = JSON.parse(localStorage.getItem(boysRangKey) || '[]') as Name[];
            console.log(boysRangBefore);
            setBoysRang(boysRangBefore);
            setGame(loadSeed,boysRangBefore);
            setShowSureModal(true);
        }
        else 
            newGame();
    }
    
    useEffect( () =>
    {
        loadGame(); 
    },[]);
    
    const display = "Phone Of Dreams";

    function getAnswer(): string
    {
        return game.getAnswer();
    }
    
    function newClue(nameCalled: Name ):string {      
        
        if(!gameStarted) return "Bad Game State";
        
        const clue= game.getClueFromBoy(nameCalled);
        console.log("Clue From:")
        console.log(Name[nameCalled]);
        console.log(clue);
      
        return clue;
       
    }        
    function getBoysAndClues() : string[]
    {
        let state = new Game(seed);
       
        let clues =  boysRang.map( (boy) => `${Name[boy]} said ${state.getClueFromBoy(boy)}`);
        console.log(boysRang);
        console.log(clues);
        return  clues;
    }

    function handlePhoneCall(number:string):PhoneClue {
        if(!gameStarted) return {message:"Bad Game State"};
        
        const boy = game.phone(number);
        updateBoysRang(boy);
        if(boy) {
            const clue = newClue(boy);
            const boyName = Name[boy]            
            return {message:clue, nameOfBoy:boyName};
        }
        return {message:"Sorry wrong number"};
    }

    let kofiSettings = "  " +
        " kofiWidgetOverlay.draw('chrispepper1989', {\n" +
        "    'type': 'floating-chat',\n" +
        "    'floating-chat.donateButton.text': 'Support me',\n" +
        "    'floating-chat.donateButton.background-color': '#ffffff',\n" +
        "    'floating-chat.donateButton.text-color': '#323842'\n" +
        "  });\n";

    if(!gameStarted){return <div>Loading...</div>}

    

    return (
        <>
        <head>

            Click Sound Effect by <a href="https://pixabay.com/users/irinairinafomicheva-25140203/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=13693">irinairinafomicheva</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=13693">Pixabay</a>
            Notification Sound Effect by <a href="https://pixabay.com/users/sergequadrado-24990007/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=21464">SergeQuadrado</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=21464">Pixabay</a>

            <Helmet>
            <script src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'/>
            <script >{kofiSettings}</script>
 
        </Helmet>

        </head>
            { 
             showSureModal ? <dialog open className='app add-dialog'>
                <h2>Phone Of Dreams</h2>
                <p>Your loaded game is {seed}</p>
                    <div className="flex flex-space-between">
                <button className="cta" onClick={() => {setShowSureModal(false); setShowLog(false)}}>Resume</button>
                <br/>
                
                <button  onClick={() => {setShowSureModal(false); setShowLog(false); newGame()} }>New Game</button>
                        <br/>
                        <button  onClick={() => setShowDebug(!showDebug)}>{!showDebug ? "Show" : "Hide"} Advanced</button>
                        {showDebug? (<div>
                <h3>Set Load Code Here:</h3>

                <div className="flex flex-space-between">
                    <input value={input} onInput={e => setInput(e.currentTarget.value)}/>

                    <br/>
                    <button  onClick={() => {setGame(input)} }>Set Seed</button>
                </div>
                
                 <h3>Boys and clues so far:</h3>                   
                    
                     {showLog ? <><ol> {getBoysAndClues().map( (value, key) =>  
                         <li key={key}>{value}</li>)}</ol>
                             <button className="cta" onClick={() => setShowAnswer(!showAnswer)}>{!showAnswer ? "Show" : "Hide"} Answer</button>
                         </>
                         : <button  onClick={() => setShowLog(true)}>Show Log</button>}
                        {showLog && showAnswer ? <p>{getAnswer()}</p> : null} </div>) : null}

                      
                </div>
                    
            </dialog> :

                <div className="App">
                    <PhoneGrid  showModal={ () =>  setShowSureModal(true)}  onCall={handlePhoneCall} display={display} getPhoneNumber={game.getPhoneNumber} onGuess={(name) => game.guessFromName(name)}></PhoneGrid>
                    
                </div>
               }
        </> 
    );
}

export default App;
