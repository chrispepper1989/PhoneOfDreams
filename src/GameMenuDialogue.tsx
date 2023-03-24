import React, {useState} from "react";
import {Name} from "./boyNames";
import {Game} from "./game";
import {PhoneProps} from "./PhoneGrid";
import {checkLocalStorageEnabled} from "./Header";

interface GameDialogueProps
{
    //game:Game;
    currentSeed: string,
    currentBoysRang :Name[],
    onCloseDialogue: () => void
    onStartNewGame: () => void;
    onLoadGame: (seed:string) => void;
}
export const GameMenuDialogue: React.FC<GameDialogueProps> = ({currentSeed,currentBoysRang, onCloseDialogue, onLoadGame,onStartNewGame}) => {
    const [showDebug, setShowDebug] = useState<boolean>(false);
    const [showLog, setShowLog] = useState<boolean>(false);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [input, setInput] = useState(currentSeed);
    const [knownSeed, setKnownSeed] = useState(currentSeed);
    const [knownBoysRang, setBoysRang] = useState(currentBoysRang);
    function getAnswer(): string {
        return new Game({seed:knownSeed}).getAnswer();
    }
  
    
    function getBoysAndCluesFromState(gameSeed: string, boysCalled: Name[]): string[] {
        let state = new Game({seed:knownSeed});
        return boysCalled.map((boy) => `${Name[boy]} said ${state.getClueFromBoy(boy)}`);
    }

    return <div>
        <div id="block-behind-overlay" className="overlay"></div>
        <dialog id="actual-dialogue" open className='app add-dialog'>
        <h2 >Phone Of Dreams</h2>
            {!checkLocalStorageEnabled() ? <div className="warning"><p className="warning">local storage is disabled. certain features of this game may not function correctly</p>

            </div> : null}
           <p>Your loaded game is {knownSeed}</p>
        <div className="flex flex-space-between">
            <button className="cta" onClick={() => {
                
                onCloseDialogue();
                setShowLog(false)
            }}>Resume
            </button>
            <br/>
            

            <button onClick={() => {                
                onCloseDialogue();
                setShowLog(false);
                onStartNewGame()
            }}>New Game
            </button>
            <br/>

            <button onClick={() => setShowDebug(!showDebug)}>{!showDebug ? "Show" : "Hide"} Advanced</button>
            {showDebug ? (<div>
                <h3>Set Load Code Here:</h3>

                <div className="flex flex-space-between">
                    <input value={input} onInput={e => setInput(e.currentTarget.value)}/>

                    <br/>
                    <button onClick={() => {
                        onLoadGame(input)
                        setKnownSeed(input);
                        setBoysRang([]);
                    }}>Set Seed
                    </button>
                </div>

                <h3>Boys and clues so far:</h3>

                {showLog ? <>
                        <ol> {getBoysAndCluesFromState(knownSeed, knownBoysRang).map((value, key) =>
                            <li key={key}>{value}</li>)}</ol>
                        <button className="cta"
                                onClick={() => setShowAnswer(!showAnswer)}>{!showAnswer ? "Show" : "Hide"} Answer
                        </button>
                    </>
                    : <button onClick={() => setShowLog(true)}>Show Log</button>}
                {showLog && showAnswer ? <p>{getAnswer()}</p> : null} </div>) : null}


        </div>

    </dialog></div>
}