//useFetch.js
import {useState} from "react";
import {checkLocalStorageEnabled} from "./Header";

export function useLocalStorageState<T>(seedKey:string, defaultValue?:T): [value:T | undefined, setValue:(state:T)=>void] {

    let loadedState = defaultValue;
    if (checkLocalStorageEnabled()) {
        const loadedJson = localStorage.getItem(seedKey);
        loadedState = loadedJson ? JSON.parse(loadedJson ) as T : defaultValue;
    }  
  
    const [value, setValue] = useState(loadedState);
    const trueValue = loadedState ?? value;
    function handleChange(newValue:T) {
       
        if(!newValue)return;
        
        if (checkLocalStorageEnabled()) {
            localStorage.setItem(seedKey, JSON.stringify(newValue));
        }
        
        if (newValue != value)
            setValue(newValue);
        
    }

    
    return [
        trueValue,  handleChange
    ];
    
}
export default useLocalStorageState;