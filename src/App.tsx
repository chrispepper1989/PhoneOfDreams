import React, {useEffect, useState} from 'react';
import './App.css';
import {Game} from "./game";

import {Name} from "./phoneNumbers";
import {PhoneGrid} from "./PhoneGrid";
import {Helmet} from "react-helmet";


function App() {
    const [game] = useState<Game>(new Game("123"));
  

    const display = "Phone Of Dreams";    
    
    function newClue(nameCalled: Name ):string {      
        
        const clue= game.getClueFromBoy(nameCalled);
        console.log("Clue From:")
        console.log(Name[nameCalled]);
        console.log(clue);
      
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
                                
            <PhoneGrid onCall={handlePhoneCall} display={display} getPhoneNumber={game.getPhoneNumber} onGuess={(guess) => game.guess(guess)}></PhoneGrid>
            
        </div>
           
        </>
    );
}

export default App;
