import {Game, Name} from "./game";
import assert from "assert";

describe('Game has Clues ', () =>
{
    const game = new Game("123");
    it('has a defined boy', () =>
    {
        expect(game.chosenBoy).toBeDefined()
    });
    it('has relevant clues', () => {        
        const clue = game.getClue(Name.John);
        expect(clue).not.toContain("Sorry");
    });
    it('has Tyler who gives a sports clue', () => {
        const game = new Game("123");
        const clue = game.getClue(Name.Tyler);
        expect(clue).toContain("He doesnt play");
    });
    it('has Luke who gives a location clue', () => {
        const game = new Game("123");
        const clue = game.getClue(Name.Luke);
        expect(clue).toContain("He doesnt hang out at");
    });
    it('has James who gives a food clue', () => {
        const game = new Game("123");
        const clue = game.getClue(Name.James);
        expect(clue).toContain("wear");
    });
})
