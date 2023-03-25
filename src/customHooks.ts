//useFetch.js
import {useState} from "react";
import {checkLocalStorageEnabled} from "./Header";

export function useLocalStorageState<T>(seedKey:string, defaultValue?:T): [value:T | undefined, setValue:(state:T, force?:boolean)=>void] {

    let loadedState = defaultValue;
    if (checkLocalStorageEnabled()) {
        const loadedJson = localStorage.getItem(seedKey);
        loadedState = loadedJson ? JSON.parse(loadedJson ) as T : defaultValue;
    }  
  
    const [value, setValue] = useState(loadedState);
    const trueValue = loadedState ?? value;
    function handleChange(newValue:T, stopStateChange?:boolean) {
       
        if(!newValue)return;
        stopStateChange = stopStateChange ?? false;
        
        if (checkLocalStorageEnabled()) {
            localStorage.setItem(seedKey, JSON.stringify(newValue));
        }
        
        if (!stopStateChange && newValue != value)
            setValue(newValue);
        
    }

    
    return [
        trueValue,  handleChange
    ];
    
}
export default useLocalStorageState;