import {boys, EnumToStringArray, EnumToStringArrayWithout, Game} from "./game";
import {Name} from "./phoneNumbers";
import {BoardLocation} from "./clueEnums";

function getLastWord(str:string)
{
    if(str)    
        return str.slice(str.lastIndexOf(' ')).trimStart();
    else
        return "";
}
function distinct(array:string[]):string[]{
    return array.filter((value, index, array) => array.indexOf(value) === index);
}

describe(`enum helper functions`, () => {
    enum test {Apple, Orange, Pear}
    
    it("Enum array without", () =>{         
          expect(EnumToStringArrayWithout(test, test.Apple)).toStrictEqual(["Orange", "Pear"])
    })
    it("Enum array ", () =>{
        expect(EnumToStringArray(test)).toStrictEqual(["Apple", "Orange", "Pear"])
    })
});

describe('Game gives right clues for specific boy ', () => {
    const game = new Game("123");
    const expectedBoy = Name.Adam
    game.setBoy(expectedBoy)
    
    it('has the correct defined boy', () => {
        expect(game.chosenBoy).toBe( boys[expectedBoy]);
    })
    it('the chosen boys location is not given as a doesnt clue and all other locations are given', () => {
        
        //exhaust location clues
        const clues:string[] = [];
        clues.push(getLastWord(game.getClue(Name.John)));
        clues.push(getLastWord(game.getClue(Name.Luke)));
        clues.push(getLastWord(game.getClue(Name.Michael)));
        clues.push(getLastWord(game.getClue(Name.Harry)));
        clues.push(getLastWord(game.getClue(Name.Ben)));
        clues.push(getLastWord(game.getClue(Name.Nick)));
        
        const fullBoy = boys[expectedBoy];
        const boylocationAsString = BoardLocation[fullBoy.location];
        
        expect(clues).not.toContain(boylocationAsString)
        const clueLocations = EnumToStringArrayWithout(BoardLocation,fullBoy.location);
        var unique = distinct(clues);
        expect(unique).toContain(clueLocations);
    });
    
});

/*
case Name.John:                
            case Name.Luke:
            case Name.Michael:
            case Name.Harry:
            case Name.Ben:
            case Name.Nick:
 */

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
    it('calling phone 555-2442 gets a clue from Nick', () => {
        const expectedNumber = "555-2442"
        const name = game.phone(expectedNumber);
        expect(name).toBe(Name.Nick);
        const clue = game.getClue(name);
        expect(clue).toContain("hang");
    });
    it('calling Nick gets phone number 555-2442', () => {
        const expectedNumber = "555-2442"
        const expectedName = Name.Nick;
        const number = game.getPhoneNumber(expectedName);
        expect(number).toBe(expectedNumber);       
    });
})
