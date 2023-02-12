import React, { useState} from "react";
import './PhoneGrid.css';
import {Name} from "./phoneNumbers";
import {BoyNameToEnum, EnumToNumberArray} from "./game";
import useSound from 'use-sound'



// @ts-ignore
import buttonSound from './button-click.mp3' 
// @ts-ignore
import message from './message.mp3'

export interface PhoneClue
{
    nameOfBoy?: string,
    message: string,
}
export interface PhoneProps {
    onCall: (number:string)=>PhoneClue
    onGuess: (name:string)=>boolean
    getPhoneNumber:(name:Name) => string
    display?:string,
}
export const PhoneGrid: React.FC<PhoneProps> = (phoneProps) => {
    const maxNumberInput = 8;

    const [playClick] = useSound(buttonSound);
    const [playMessage] = useSound(message);

    function getVoices() {
        let voices = speechSynthesis.getVoices();
        if(!voices.length){
            let utterance = new SpeechSynthesisUtterance("");
            speechSynthesis.speak(utterance);
            voices = speechSynthesis.getVoices();
        }
        return voices;
    }
    
    function handleCallButton(number: string) {
        if(isGuessing)
        {
            playMessage();
            const correct = phoneProps.onGuess(display)
            let message = correct ? `You are correct! ${display} liiiikes you! <3`
                : `I am sorry you are wrong about ${display}`
            setIsGuessing(false);
            setIsPhoneNumber(false);
            setDisplay(message);
        }
        else {
            //playMessage();
            const clue = phoneProps.onCall(number);
            setNumber("555-");       
            
            
            let clueText = `${clue.message}`;
            if(clue.nameOfBoy) {
                clueText = `📩 ${clue.nameOfBoy} says: ${clue.message}`;
                
                if(speakerOn) {
                    let speakData = new SpeechSynthesisUtterance(clue.message);
                    speakData.voice = getVoices()[3];
                    speakData.volume = 0.05; // From 0 to 1
                    speakData.rate = 1; // From 0.1 to 10
                    speakData.pitch = 2; // From 0 to 2          
                    speakData.lang = 'en';
                    speechSynthesis.speak(speakData);
                }
            }
                      
            setDisplay(clueText);
            setIsPhoneNumber(false)
            setIsGuessing(false);
        }
    }

    function setNumber(number: string) {
        setIsPhoneNumber(true)
        setPhoneNumber(number);
        setDisplay(number)
    }

    function handleClearClick() {
        playClick();
        setNumber("555-");
    }

    function handleButtonClick(number: string) {
        playClick();
        
        if (phoneNumber.length < maxNumberInput)
            setNumber(phoneNumber + number);
    }

    function handleGuessButton() {
        playClick();
        setDisplay("");
        setIsGuessing(true);
    }

    const [phoneNumber, setPhoneNumber] = useState("555-");
    const [isPhoneNumber, setIsPhoneNumber] = useState(true);
    
    const [isGuessing, setIsGuessing] = useState(false);
    const [display, setDisplay] = useState(phoneProps.display ?? "555-");
    const names = EnumToNumberArray(Name);
    const [nameSelected, setNameSelected] = useState<string>("John");
    const [speakerOn, setSpeakerOn] = React.useState(true);
    
    const handleSpeedDialChange = (e: any) => {

        const nameCalled: Name = BoyNameToEnum(e.target.value);        
        const number = phoneProps.getPhoneNumber(nameCalled);
                
        if(isGuessing) {
            setDisplay(Name[nameCalled]);
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
            setDisplay(event.target.value);
        } else {
            const charEntered: string = event.target.value[event.target.value.length - 1];
            if (!isNaN(Number(charEntered))) {
                handleButtonClick(charEntered);
            }

        }
    }

        return (

            <div className="container">
                <div className="buttons">
                    {[...Array(9)].map((x, i) =>
                        <div className={`button-${i+1}`}><button onClick={() => handleButtonClick(`${i}`)}  >{i}</button></div>
                    )}
                    <div className="star"><button      onClick={() => handleGuessButton()}>*</button></div>
                    <div className="guess"><button     onClick={() => handleGuessButton()}>#</button></div>
                    <div className="button-0"><button  onClick={() => handleButtonClick(`0`)}>0</button></div>
                </div>
                <div className="screen">
                    <div className="Screen display">
                        {isPhoneNumber || isGuessing?
                            <input value={display} onChange={handleInputChange}/>
                            :
                            <div>{display}</div>}
                           
                    </div>
                    <div className="speedDial">                      
                        <label htmlFor="dropdown">Speed Dial:</label>
                        <select id="dropdown" value={nameSelected} onChange={handleSpeedDialChange}>
                            {names.map((x: Name) => <option key={Name[x]} value={Name[x]}>{Name[x]}</option>)}
                        </select>

                        <label htmlFor="speaker" style={{display:"inline", paddingTop:"5px"}}>Speaker Phone</label>                    
                        <input id="speaker"
                               type="checkbox"
                               defaultChecked={speakerOn}
                               style={{display:"inline", marginTop:"-25px"}}
                               onChange={() => setSpeakerOn(!speakerOn)}
                        />
                      
                    </div>
                    <div className="end"><button onClick={() => handleClearClick()}>End</button></div>
                    <div className="call"><button onClick={() => handleCallButton(phoneNumber)}>Call</button></div>
                </div>
                
            </div>
            
);
    
}