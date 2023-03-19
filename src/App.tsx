import React, {useEffect, useState} from 'react';
import './App.css';
import {Game} from "./game";

import {PhoneClue, PhoneGrid} from "./PhoneGrid";
import {Helmet} from "react-helmet";
import {Name} from "./boyNames";


function App() {
    const seedKey = "seedkey";
  
    const [seed,setSeed]= useState<string>("123456");
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [showSureModal, setShowSureModal] = useState<boolean>(false);
    const [showSetModal, setShowSetModal] = useState<boolean>(false);
    const [input, setInput] = useState('');
    let game:Game = new Game(seed);


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
    function setGame(seed:string)
    {
        setGameStarted(true);
        localStorage.setItem(seedKey, seed);
        setSeed(seed);
        setInput(seed);
        game = new Game(seed);
    }
    function newGame()
    {
        const maxNumber =   9999;
        const maxPadding = "0000";
        
        const number = (Math.floor(Math.random()*maxNumber)).toString()
        console.log(number);
        // crypto.randomUUID(); (alternate)
        const newSeed =  maxPadding.substring(number.length) + number;
       
        console.log("save seed is " +newSeed)
        setGame(newSeed);
    }
    function loadGame()
    {
        let loadSeed = localStorage.getItem(seedKey) ;
        console.log("load seed is " + loadSeed)
        if(loadSeed) {
            setGame(loadSeed);
        }
        else 
            newGame();
    }
    
    useEffect( () =>
    {
        loadGame(); 
    },[]);
    
    const display = "Phone Of Dreams";    
    
   
    
    function newClue(nameCalled: Name ):string {      
        
        if(!gameStarted) return "Bad Game State";
        
        const clue= game.getClueFromBoy(nameCalled);
        console.log("Clue From:")
        console.log(Name[nameCalled]);
        console.log(clue);
      
        return clue;
       
    }        

    function handlePhoneCall(number:string):PhoneClue {
        if(!gameStarted) return {message:"Bad Game State"};
        
        const boy = game.phone(number);
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

    if(!gameStarted){return <div>bad game state</div>}

    

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
            { showSetModal ?
                <dialog open className='app add-dialog'>
                <h2>Set Seed</h2>
                
                <div className="flex flex-space-between">
                 <input value={input} onInput={e => setInput(e.currentTarget.value)}/>
           
                <br/>
                <button className="cta" onClick={() => {setShowSetModal(false); setGame(input)} }>Set Seed</button>
                </div>
                </dialog>
                :
             showSureModal ? <dialog open className='app add-dialog'>
                <h2>Wait</h2>
                <p>Are You Sure you want to make a new game</p>
                    <div className="flex flex-space-between">
                <button onClick={() => setShowSureModal(false)}>No</button>
                <br/>
                <button className="cta" onClick={() => {setShowSureModal(false); newGame()} }>Yes: New Game</button>
                    </div>
            </dialog> :

                <div className="App">
                    <PhoneGrid onCall={handlePhoneCall} display={display} getPhoneNumber={game.getPhoneNumber} onGuess={(name) => game.guessFromName(name)}></PhoneGrid>
                    <button onClick={() => setShowSureModal(true)} > Playing Seed {seed}, Click for New Game</button>
                    <button onClick={() => setShowSetModal(true)} > Click to set seed</button>
                </div>
               }
        </> 
    );
}

export default App;
