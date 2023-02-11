import {Game, Name} from "./game";
import assert from "assert";

describe('Game has Clues ', () =>
{
    const game = new Game("123");
    it('has a defined boy')
    {
        expect(game.chosenBoy).toBeDefined()
    }
    it('has relevant clues', () => {        
        const clue = game.getClue(Name.John);
        expect(clue).not.toContain("Sorry");
    });
    it('has Tyler who gives a sports clue', () => {
        const game = new Game("123");
        const clue = game.getClue(Name.Tyler);
        expect(clue).toContain("He doesnt play");
    });
})
