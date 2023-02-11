﻿import {Game, Name} from "./game";

describe('Game gives right clues for specific boy ', () => {
    const game = new Game("123");
    game.setBoy(Name.Adam)
    it('has a defined boy', () => {
        expect(game.chosenBoy).toBeDefined()
    });
});

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
      
        const clue = game.getClue(Name.Tyler);
        expect(clue).toContain("He doesnt play");
    });
    it('has Luke who gives a location clue', () => {
        
        const clue = game.getClue(Name.Luke);
        expect(clue).toContain("He doesnt hang out at");
    });
    it('has James who gives a food clue', () => {
      
        const clue = game.getClue(Name.James);
        expect(clue).toContain("wear");
    });
    it('gives clues from number', () => {
     
        const clue = game.getClue(11);
        expect(clue).toContain("play");
    });
})
