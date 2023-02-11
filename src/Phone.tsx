import React, { useState} from "react";
import './Phone.css';

export interface PhoneProps {
    onCall: (number:string)=>void
  
}
export const Phone: React.FC<PhoneProps> = (phoneProps) => {
    function handleClearClick() {
        setPhoneNumber("555-");
    }
    function handleButtonClick(number:string) {
        setPhoneNumber(phoneNumber + number);
    }
    const [phoneNumber,setPhoneNumber] = useState("555-");
  
  
    
    return(        
        
    <div className="container">
        <input value={phoneNumber}/>
        <div className="row"><a onClick={() => handleButtonClick('1')} href="#">1</a><a onClick={() => handleButtonClick("2")} href="#">2</a><a onClick={() => handleButtonClick('3')} href="#">3</a></div>
        <div className="row"><a onClick={() => handleButtonClick('4')} href="#">4</a><a onClick={() => handleButtonClick("5")} href="#">5</a><a onClick={() => handleButtonClick('6')} href="#">6</a></div>
        <div className="row"><a onClick={() => handleButtonClick('7')} href="#">7</a><a onClick={() => handleButtonClick("8")} href="#">8</a><a onClick={() => handleButtonClick('9')} href="#">9</a></div>
        <div className="row"><a onClick={() => handleButtonClick('*')} href="#">*</a><a onClick={() => handleButtonClick("0")} href="#">0</a><a onClick={() => handleButtonClick('#')} href="#">#</a></div>
        <div className="row"><a onClick={() => phoneProps.onCall(phoneNumber)} className="call" href="#"><i className="fa fa-phone">Call</i></a></div>
        <div className="row"><a onClick={() => handleClearClick()} className="clear" href="#"><i className="fa fa-phone">Clear</i></a></div>
    </div>);
}