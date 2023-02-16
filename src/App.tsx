import React, {useEffect, useState} from 'react';
import './App.css';
import {Game} from "./game";

import {PhoneClue, PhoneGrid} from "./PhoneGrid";
import {Helmet} from "react-helmet";
import {Name} from "./boyNames";


function App() {
    const seedKey = "seedkey";
  
    //const [game, setGame] = useState<Game>(new Game(seed));
    const [seed,setSeed]= useState<string>("123");
    const  game = new Game(seed);

    function newGame()
    {
        const newSeed = crypto.randomUUID();
        console.log("save seed is " +newSeed)        
        localStorage.setItem(seedKey, seed);
        setSeed(newSeed);
    }
    function loadGame()
    {
        let loadSeed = localStorage.getItem(seedKey) ;
        console.log("load seed is " + loadSeed)
        if(loadSeed) {         
            setSeed(loadSeed);
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
        
        const clue= game.getClueFromBoy(nameCalled);
        console.log("Clue From:")
        console.log(Name[nameCalled]);
        console.log(clue);
      
        return clue;
       
    }        

    function handlePhoneCall(number:string):PhoneClue {
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
        <div className="App">
                                
            <PhoneGrid onCall={handlePhoneCall} display={display} getPhoneNumber={game.getPhoneNumber} onGuess={(name) => game.guessFromName(name)}></PhoneGrid>
            
        </div>
           <button onClick={() => newGame()} > Playing Seed {seed}, Click for New Game</button>
        </>
    );
}

export default App;
