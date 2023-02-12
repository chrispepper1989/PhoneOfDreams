import React, { useState} from "react";
import './Phone.css';
import {Name} from "./phoneNumbers";
import {BoyNameToEnum, EnumToNumberArray, Game} from "./game";

export interface PhoneProps {
    onCall: (number:string)=>void
    game:Game,
    display?:string,
}
export const Phone: React.FC<PhoneProps> = (phoneProps) => {
    const maxNumberInput = 8;
    const game = phoneProps.game;
    function onCallButton(number:string)
    {
        phoneProps.onCall(number);       
        const clue= game.phoneClue(number);
        setDisplay(clue);
        setIsPhoneNumber(false)
    }
    function setNumber(number: string)
    {
        setIsPhoneNumber(true)
        setPhoneNumber(number);
        setDisplay(number)
    }
    function handleClearClick() {
        setNumber("555-");
    }
    function handleButtonClick(number:string) {
        if(phoneNumber.length < maxNumberInput)
            setNumber(phoneNumber + number);
    }
    const [phoneNumber,setPhoneNumber] = useState(  "555-");
    const [isPhoneNumber, setIsPhoneNumber] = useState(true);
    const [display,setDisplay] = useState( phoneProps.display?? "555-");
    const names = EnumToNumberArray(Name);
    const [nameSelected, setNameSelected] = useState<Name>(Name.John);
    
    const handleSpeedDialChange = (e: any) => {
        const nameCalled:Name = BoyNameToEnum(e.target.value);
        setNameSelected(nameCalled);
        const number = game.getPhoneNumber(nameCalled);
        setNumber(number);
    };
    
    return(        
        
    <div className="container">
        <div className="screen">
        <input value={display} style={{ fontSize: isPhoneNumber ? "xxx-large" : "medium" }}/>
        </div>
       <label>Speed Dial:</label>
        <select id="dropdown" value={nameSelected} onChange={handleSpeedDialChange}>
            <option  disabled selected>Select Speed Dial:</option>
            {names.map((x: Name) =>    <option key={Name[x]} value={Name[x]}>{Name[x]}</option>)}
        </select>
        
        <div className="row"><a onClick={() => handleButtonClick('1')} href="#">1</a><a onClick={() => handleButtonClick("2")} href="#">2</a><a onClick={() => handleButtonClick('3')} href="#">3</a></div>
        <div className="row"><a onClick={() => handleButtonClick('4')} href="#">4</a><a onClick={() => handleButtonClick("5")} href="#">5</a><a onClick={() => handleButtonClick('6')} href="#">6</a></div>
        <div className="row"><a onClick={() => handleButtonClick('7')} href="#">7</a><a onClick={() => handleButtonClick("8")} href="#">8</a><a onClick={() => handleButtonClick('9')} href="#">9</a></div>
        <div className="row"><a onClick={() => handleButtonClick('*')} href="#">*</a><a onClick={() => handleButtonClick("0")} href="#">0</a><a onClick={() => handleButtonClick('#')} href="#">#</a></div>
        <div className="row"><a onClick={() => onCallButton(phoneNumber)} className="call" href="#"><i className="fa fa-phone">Call</i></a></div>
        <div className="row"><a onClick={() => handleClearClick()} className="clear" href="#"><i className="fa fa-phone">Clear</i></a></div>
    </div>);
}