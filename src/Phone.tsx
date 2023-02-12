import React, { useState} from "react";
import './Phone.css';
import {Name} from "./phoneNumbers";
import {BoyNameToEnum, EnumToNumberArray} from "./game";

export interface PhoneProps {
    onCall: (number:string)=>string
    onGuess: (name:string)=>boolean
    getPhoneNumber:(name:Name) => string
    display?:string,
}
export const Phone: React.FC<PhoneProps> = (phoneProps) => {
    const maxNumberInput = 8;

    function onCallButton(number: string) {
        if(isGuessing)
        {
            const correct = phoneProps.onGuess(display)
            let message = correct ? `You are correct! ${display} liiiikes you! <3`
                : `I am sorry you are wrong about ${display}`
            setIsGuessing(false);
            setIsPhoneNumber(false);
            setDisplay(message);
        }
        else {
            const clue = phoneProps.onCall(number);
            setNumber("555-");
            setDisplay(clue);
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
        setNumber("555-");
    }

    function handleButtonClick(number: string) {

        if (phoneNumber.length < maxNumberInput)
            setNumber(phoneNumber + number);
    }

    function handleGuessButton() {
        setDisplay("");
        setIsGuessing(true);
    }

    const [phoneNumber, setPhoneNumber] = useState("555-");
    const [isPhoneNumber, setIsPhoneNumber] = useState(true);
    
    const [isGuessing, setIsGuessing] = useState(false);
    const [display, setDisplay] = useState(phoneProps.display ?? "555-");
    const names = EnumToNumberArray(Name);
    const [nameSelected, setNameSelected] = useState<string>("John");

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

                <div className="screen">
                    {isPhoneNumber || isGuessing?
                        <input value={display} onChange={handleInputChange}/>
                        :
                        <div>{display}</div>}
                </div>
                <div className="speedDial">
                    <label>Speed Dial:</label>
                    <select id="dropdown" value={nameSelected} onChange={handleSpeedDialChange}>
                       
                        {names.map((x: Name) => <option key={Name[x]} value={Name[x]}>{Name[x]}</option>)}
                    </select>
                </div>
                <div className="row"><a onClick={() => handleButtonClick('1')} href="#">1</a><a
                    onClick={() => handleButtonClick("2")} href="#">2</a><a onClick={() => handleButtonClick('3')}
                                                                            href="#">3</a></div>
                <div className="row"><a onClick={() => handleButtonClick('4')} href="#">4</a><a
                    onClick={() => handleButtonClick("5")} href="#">5</a><a onClick={() => handleButtonClick('6')}
                                                                            href="#">6</a></div>
                <div className="row"><a onClick={() => handleButtonClick('7')} href="#">7</a><a
                    onClick={() => handleButtonClick("8")} href="#">8</a><a onClick={() => handleButtonClick('9')}
                                                                            href="#">9</a></div>
                <div className="row"><a onClick={() => handleButtonClick('*')} href="#">*</a><a
                    onClick={() => handleButtonClick("0")} href="#">0</a><a onClick={() => handleGuessButton()}
                                                                            href="#">#</a></div>
                <div className="row"><a onClick={() => onCallButton(phoneNumber)} className="call" href="#"><i
                    className="fa fa-phone">Call</i></a></div>
                <div className="row"><a onClick={() => handleClearClick()} className="clear" href="#"><i
                    className="fa fa-phone">Clear</i></a></div>
            </div>);
    
}