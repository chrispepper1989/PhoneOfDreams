import {EnumToStringArray, EnumToStringArrayWithout, Game} from "./game";
import {Name} from "./phoneNumbers";
import {BoardLocation, Clothes, ClueTypes, Food, Sport} from "./clueEnums";
import {boys} from "./boys";

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

describe('Game gives right clues for specific boy: Adam ', () => {
    const game = new Game("123");
    const expectedBoy = Name.Adam
    game.setBoy(expectedBoy)
    
    it('has the correct defined boy', () => {
        expect(game.crushBoy).toBe( boys[expectedBoy]);
    })
    it("returns true when player guesses Adam", () =>
    {
        expect(game.guessFromName("Adam")).toBe(true);
    });
    it("returns true when player guesses Adams number", () =>
    {
        expect(game.guessFromNumber("555-1111")).toBe(true);
    });
    it('the chosen boys location is not given as a doesnt clue and all other locations are given', () => {
        
        //exhaust location clues
        const cluesGiven:string[] = [];
        cluesGiven.push(getLastWord(game.getClueFromBoy(Name.John)));
        cluesGiven.push(getLastWord(game.getClueFromBoy(Name.Luke)));
        cluesGiven.push(getLastWord(game.getClueFromBoy(Name.Michael)));
        cluesGiven.push(getLastWord(game.getClueFromBoy(Name.Harry)));
        cluesGiven.push(getLastWord(game.getClueFromBoy(Name.Ben)));
        cluesGiven.push(getLastWord(game.getClueFromBoy(Name.Nick)));
        
        const fullBoy = boys[expectedBoy];
        const boylocationAsString = BoardLocation[fullBoy.location];
        
        expect(cluesGiven).not.toContain(boylocationAsString)
        const clueLocations = EnumToStringArrayWithout(BoardLocation,fullBoy.location);
        const unique = distinct(cluesGiven);
        expect(unique).toStrictEqual(clueLocations);
    });
    it('the chosen boys sport is not given as a doesnt clue and all other sports are given', () => {

        //exhaust sport clues
        const cluesGiven:string[] = [];
        cluesGiven.push(getLastWord(game.getClueFromBoy(Name.Adam)));
        cluesGiven.push(getLastWord(game.getClueFromBoy(Name.Josh)));
        cluesGiven.push(getLastWord(game.getClueFromBoy(Name.Patrick)));
        cluesGiven.push(getLastWord(game.getClueFromBoy(Name.Peter)));
        cluesGiven.push(getLastWord(game.getClueFromBoy(Name.Anthony)));
        cluesGiven.push(getLastWord(game.getClueFromBoy(Name.Tyler)));

        const fullBoy = boys[expectedBoy];
        const boySportAsString = fullBoy.sport ? Sport[fullBoy.sport] : undefined;

        expect(cluesGiven).not.toContain(boySportAsString)
        const clueSports = EnumToStringArrayWithout(Sport,fullBoy.sport);
        const unique = distinct(cluesGiven);
        expect(unique).toStrictEqual(clueSports);
    });
    
    function assertCorrectClues(clueType:ClueTypes, boyRealAsString:string|undefined,expectedGivenClues:string[])
    {
        //act        
        const cluesGiven:string[] = [];
        for(let i = 0; i < 6; ++i)
        {
            //exhaust clues
            const clue = game.getClue(clueType);
            const keyWord = getLastWord(clue);
            cluesGiven.push(keyWord);
        }

        //assert
        expect(cluesGiven).not.toContain(boyRealAsString)
        const uniqueCluesGiven = distinct(cluesGiven);
        expect(uniqueCluesGiven).toStrictEqual(expectedGivenClues);
    }
    
    it("the chosen boys food is not given as a doesnt clue and all other foods are given", () => {
        //arrange
        const fullBoy = boys[expectedBoy];    
        const boyRealAsString = fullBoy.food ? Food[fullBoy.food] : undefined;
        const expectedGivenClues = EnumToStringArrayWithout(Food,fullBoy.food);
        assertCorrectClues(ClueTypes.Food,boyRealAsString,expectedGivenClues);        
    });
    it("the chosen boys clothes is not given as a doesnt clue and all other clothes are given", () => {
        //arrange
        const fullBoy = boys[expectedBoy];
        const boyRealAsString = fullBoy.wears ? Clothes[fullBoy.wears] : undefined;
        const expectedGivenClues = EnumToStringArrayWithout(Clothes,fullBoy.wears);
        assertCorrectClues(ClueTypes.Clothes,boyRealAsString,expectedGivenClues);
    });    
});


describe('Game has Clues ', () =>
{
    const game = new Game("123");
    it('has a defined boy', () =>
    {
        expect(game.crushBoy).toBeDefined()
    });
    it('has relevant clues', () => {        
        const clue = game.getClueFromBoy(Name.John);
        expect(clue).not.toContain("Sorry");
    });
    it('has Tyler who gives a sports clue', () => {
      
        const clue = game.getClueFromBoy(Name.Tyler);
        expect(clue).toContain("not interested");
    });
    it('has Luke who gives a location clue', () => {
        
        const clue = game.getClueFromBoy(Name.Luke);
        expect(clue).toContain("He doesnt hang out at");
    });
    it('has James who gives a food clue', () => {
      
        const clue = game.getClueFromBoy(Name.James);
        expect(clue).toContain("wear");
    });
    it('gives clues from number', () => {
     
        const clue = game.getClueFromBoy(11);
        expect(clue).toContain("not interested");
    });
    it('calling phone 555-2442 gets a clue from Nick', () => {
        const expectedNumber = "555-2442"
        const name = game.phone(expectedNumber);
        expect(name).toBe(Name.Nick);
        const clue = game.getClueFromBoy(name);
        expect(clue).toContain("hang");
    });
    it('calling Nick gets phone number 555-2442', () => {
        const expectedNumber = "555-2442"
        const expectedName = Name.Nick;
        const number = game.getPhoneNumber(expectedName);
        expect(number).toBe(expectedNumber);       
    });
})
