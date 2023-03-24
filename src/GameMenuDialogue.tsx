import React, {useState} from "react";
import {Name} from "./boyNames";
import {Game} from "./game";
import {PhoneProps} from "./PhoneGrid";

interface GameDialogueProps
{
    game:Game;
    onCloseDialogue: () => void
    onStartNewGame: () => void;
    onLoadGame: () => void;
}
export const GameMenuDialogue: React.FC<GameDialogueProps> = ({game, onCloseDialogue}) => {
    const [showDebug, setShowDebug] = useState<boolean>(false);
    const [showLog, setShowLog] = useState<boolean>(false);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [input, setInput] = useState('');
        
    function getAnswer(): string {
        return game.getAnswer();
    }

    function getBoysAndCluesFromState(gameSeed: string, boysCalled: Name[]): string[] {
        let state = new Game(gameSeed);
        return boysCalled.map((boy) => `${Name[boy]} said ${state.getClueFromBoy(boy)}`);
    }

    return <dialog open className='app add-dialog'>
        <h2>Phone Of Dreams</h2>
        <p>Your loaded game is {game.Seed}</p>
        <div className="flex flex-space-between">
            <button className="cta" onClick={() => {
                //setShowSureModal(false);
                onCloseDialogue();
                setShowLog(false)
            }}>Resume
            </button>
            <br/>

            <button onClick={() => {
                //setShowSureModal(false);
                onCloseDialogue();
                setShowLog(false);
                newGame()
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
                        restartGame(input)
                    }}>Set Seed
                    </button>
                </div>

                <h3>Boys and clues so far:</h3>

                {showLog ? <>
                        <ol> {getBoysAndCluesFromState(game.Seed, game.boysRang).map((value, key) =>
                            <li key={key}>{value}</li>)}</ol>
                        <button className="cta"
                                onClick={() => setShowAnswer(!showAnswer)}>{!showAnswer ? "Show" : "Hide"} Answer
                        </button>
                    </>
                    : <button onClick={() => setShowLog(true)}>Show Log</button>}
                {showLog && showAnswer ? <p>{getAnswer()}</p> : null} </div>) : null}


        </div>

    </dialog>
}