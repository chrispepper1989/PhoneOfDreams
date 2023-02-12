import React, {useEffect, useState} from 'react';
import './App.css';
import {Game} from "./game";


import {Name} from "./phoneNumbers";
import {PhoneGrid} from "./PhoneGrid";
import {Helmet} from "react-helmet";



function App() {
    const [game,setGame] = useState<Game>(new Game("123"));
    const [clues, setClues] = useState<string[]>();
    const [clueLength, setClueLength] = useState<number>(0);
    const latestClue = clues ? clues[clues.length - 1] : undefined;


    useEffect(() => {
        const script = document.createElement('script');

        let kofiWidgetOverlay:any = null;
        script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
       
        script.async = true;

        document.body.appendChild(script);

        kofiWidgetOverlay?.draw('chrispepper1989', {
            'type': 'floating-chat',
            'floating-chat.donateButton.text': 'Support me',
            'floating-chat.donateButton.background-color': '#ffffff',
            'floating-chat.donateButton.text-color': '#323842'
        });
        

        return () => {
            document.body.removeChild(script);
        }
    }, []);
    
    
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

    let kofiSettings = "  kofiWidgetOverlay.draw('chrispepper1989', {\n" +
        "    'type': 'floating-chat',\n" +
        "    'floating-chat.donateButton.text': 'Support me',\n" +
        "    'floating-chat.donateButton.background-color': '#ffffff',\n" +
        "    'floating-chat.donateButton.text-color': '#323842'\n" +
        "  });\n";
      
    return (
        <>
        <head>Click Sound Effect by <a href="https://pixabay.com/users/irinairinafomicheva-25140203/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=13693">irinairinafomicheva</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=13693">Pixabay</a>
            Notification Sound Effect by <a href="https://pixabay.com/users/sergequadrado-24990007/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=21464">SergeQuadrado</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=21464">Pixabay</a>
        </head>
           <Helmet>
            <script src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'></script>
            <script>{kofiSettings}</script>
        </Helmet>
        <div className="App">
                                
            <PhoneGrid onCall={handlePhoneCall} display={latestClue} getPhoneNumber={game.getPhoneNumber} onGuess={(guess) => game.guess(guess)}></PhoneGrid>
            
        </div>
        </>
    );
}

export default App;
