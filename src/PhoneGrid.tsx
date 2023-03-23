import React, {useEffect, useState} from "react";
import './PhoneGrid.css';
import {BoyNameToEnum, EnumToNumberArray} from "./game";
import useSound from 'use-sound'



// @ts-ignore
import buttonSound from './button-click.mp3' 
// @ts-ignore
import message from './message.mp3'
import {Name} from "./boyNames";

export interface PhoneClue
{
    nameOfBoy?: string,
    message: string,
}
export interface PhoneProps {
    onCall: (number:string)=>PhoneClue
    onGuess: (name:string)=>boolean
    showModal: () => void
    getPhoneNumber:(name:Name) => string
    display?:string,
}
export const PhoneGrid: React.FC<PhoneProps> = (phoneProps) => {
    const maxNumberInput = 8;

    const [playClick] = useSound(buttonSound);
    const [playMessage] = useSound(message);
    const [phoneNumber, setPhoneNumber] = useState("555-");
    const [isPhoneNumber, setIsPhoneNumber] = useState(true);
    
    const FakeBoy = "No One";
    const [isGuessing, setIsGuessing] = useState(false);
    const [input, setInput] = useState("");
    const [guess, setGuess] = useState("none");
    const [isHowToPlay, setIsHowToPlay] = useState(true);
    const [inFullScreen, setInFullScreen] = useState(false);
    const [display, setDisplay] = useState(phoneProps.display ?? "555-");
    const names = EnumToNumberArray(Name);
    const [nameSelected, setNameSelected] = useState<string>(FakeBoy);
    const [speakerOn, setSpeakerOn] = React.useState(true);
    const [lastClue, setLastClue] = React.useState<PhoneClue | undefined>(undefined);
    //let inFullScreen = document.fullscreenElement;
    
    function getVoices() {
        let voices = speechSynthesis.getVoices();
        if(!voices.length){
            let utterance = new SpeechSynthesisUtterance("");
            speechSynthesis.speak(utterance);
            voices = speechSynthesis.getVoices();
        }
        return voices;
    }
    useEffect( () =>
    {
        setInFullScreen(false);
      //  document.body.requestFullscreen();
    },[display])
    
    function handleCallButton(number: string) {
        function handleGuess() {
           
            setGuess(input);
            const correct = phoneProps.onGuess(input);
           
            let message = correct ? `You are correct! ${input} liiiikes you! <3`
                : `I am sorry you are wrong about ${input}`
            
            if(correct)
            {
                playMessage();
                speakMessage("yes, I like you!");
            }
            else
            {
                speakMessage("Nope");
            }
            setIsGuessing(false);
            setIsPhoneNumber(false);
            setDisplay(message);
        }
        function speakMessage(message:string) {
            if (speakerOn) {
                let speakData = new SpeechSynthesisUtterance(message);
                speakData.voice = getVoices()[3];
                speakData.volume = 0.05; // From 0 to 1
                speakData.rate = 1; // From 0.1 to 10
                speakData.pitch = 2; // From 0 to 2          
                speakData.lang = 'en';
                speechSynthesis.speak(speakData);
            }
        }
        function handleCall() {
            //playMessage();
            const clue = phoneProps.onCall(number);
            setNumber("555-");
            let clueText = `${clue.message}`;
           

            if (clue.nameOfBoy) {
                clueText = `📩 ${clue.nameOfBoy} says: ${clue.message}`;
                setLastClue(clue)
                speakMessage(clue.message);
            }
            else if(lastClue)
            {
                clueText = `📩 ${lastClue.nameOfBoy} says: ${lastClue.message}`;
                speakMessage(lastClue.message);
            }

            setDisplay(clueText);
            setIsPhoneNumber(false)
            setIsGuessing(false);
        }

        if(isGuessing)
        {
            handleGuess();
        }
        else {
            handleCall();
        }
    }

    function setNumber(number: string) {
        setInput(number);
        setPhoneNumber(number);
        setIsPhoneNumber(true)
        setDisplay(number)
        setIsHowToPlay(false);
        console.log("display is " + number );
    }

    function handleClearClick() {
        playClick();
        setNumber("555-");
        setLastClue(undefined)
        setNameSelected(FakeBoy);
        setIsHowToPlay(false);
    }

    function handleButtonClick(number: string) {
        playClick();
        console.log("number pressed " + number);
        if (phoneNumber.length < maxNumberInput)
            setNumber(phoneNumber + number);
    }

    function handleGuessButton() {
        playClick();        
        setInput("Dial Your Guess")
        setIsGuessing(!isGuessing);
        setIsHowToPlay(false);
    }   
    
    const handleSpeedDialChange = (e: any) => {

        const nameCalled: Name = BoyNameToEnum(e.target.value);        
        const number = phoneProps.getPhoneNumber(nameCalled);
                
        if(isGuessing) {          
            setInput(Name[nameCalled]);
        }
        else
        {
            setNumber(number);            
        }
        console.log(nameCalled);
        setNameSelected(Name[nameCalled]);
    };

    function handleInputChange(event: any) {

        if (isGuessing) {
            setInput(event.target.value);
        } else {
            const charEntered: string = event.target.value[event.target.value.length - 1];
            if (!isNaN(Number(charEntered))) {
                handleButtonClick(charEntered);
            }

        }
    }

    function handleInfoButton() {
        
        setIsHowToPlay(!isHowToPlay);
        setDisplay("");
        setIsPhoneNumber(false)
        setIsGuessing(false)
    }
    
    return (

            <div className="container">
                <div className="buttons">
                    {[...Array(9)].map((x, i) =>                        
                        <div className={`button-${i+1} phone-button`}><button onClick={() => handleButtonClick(`${i+1}`)}  >{i+1}</button></div>
                    )}
                    <div className="star phone-button"><button      onClick={() => handleInfoButton()}>ⓘ</button></div>
                    <div className="guess phone-button"><button     onClick={() => handleGuessButton()}>❔</button></div>
                    <div className="button-0 phone-button"><button  onClick={() => handleButtonClick(`0`)}>0</button></div>
                </div>
                <div className="screen">
                    <div className="Screen display">
                        {isHowToPlay && !isGuessing  ? <> 
                            <div className="info">
                                <a href='https://github.com/chrispepper1989/PhoneOfDreams#readme'> How To Play </a>                               
                                <button onClick={() => phoneProps.showModal()} > Click for Game Menu</button>
                                <button onClick={()=>{ document.fullscreenElement ? document.exitFullscreen() : document.body.requestFullscreen(); setInFullScreen(!!document.fullscreenElement)}}>{!inFullScreen ? "Exit" : "Enter"} Full Screen</button>
                                <button onClick={()=>{setIsHowToPlay(false);}}>Close Info</button>
                            </div></>: null}
                        {isPhoneNumber || isGuessing?
                            <input value={input} onChange={handleInputChange}/>
                            :
                            <div>{display}</div>}
                           
                    </div>
                    <div className="speedDial speaker">                      
                        
                        <select id="dropdown" value={nameSelected} onChange={handleSpeedDialChange}>
                            <option key={9999} value={FakeBoy} disabled={true}>Speed Dial</option>
                          
                            {names.map((x: Name) => <option key={Name[x]} value={Name[x]}>{Name[x]}</option>)}
                        </select>
                        <div className="speaker">
                                      
                        <input id="speaker"
                               type="checkbox"
                               defaultChecked={speakerOn}
                               style={{display:"inline", marginTop:"-25px"}}
                               onChange={() => setSpeakerOn(!speakerOn)}
                        />
                            <label htmlFor="speaker" style={{display:"inline", paddingTop:"5px"}}></label>
                  
                        </div>
                       
                      
                    </div>
                    <div className="end"><button onClick={() => handleClearClick()}>☏</button></div>
                    <div className="call"><button onClick={() => handleCallButton(phoneNumber)}>☏</button></div>
                </div>
                
            </div>
            
);
    
}
