import Rand from 'rand-seed';
import {phoneNumbers} from "./phoneNumbers";
import {BoardLocation, Clothes, ClueTypes, Food, Sport} from "./clueEnums";
import {boys, type TBoy} from "./boys";
import {Name} from "./boyNames";


export function BoyNameToEnum(name:string):Name
{  
    const typedName = name as keyof typeof Name;
    return Name[typedName];
}
export function EnumToStringArrayWithoutEntries(anEnum:any, elements:any[]) {

    return Object.keys(anEnum)
        .filter( value => !elements.includes(Number(value)))
        .filter(value => !isNaN(Number(value)))
        .map(key => anEnum[key]);
}

export function EnumToStringArrayWithout(anEnum:any, element:any) {

    return Object.keys(anEnum)
        .filter(value => !isNaN(Number(value)))
        .filter( value => value !== element)
        .map(key => anEnum[key]);
}
export function EnumToStringArray(anEnum:any) {

    return Object.keys(anEnum)
        .filter(value => !isNaN(Number(value)))
        .map(key => anEnum[key]);
}
export function EnumToNumberArray(anEnum:any):number[] {

    return Object.values(anEnum)
        .filter(value => !isNaN(Number(value))) as number[];

}

export interface PhoneClue
{
    nameOfBoy?: string,
    message: string,
}
const numberOfBoys = Object.keys(boys).length;
export function newGameSeed():string{
    const maxNumber =   9999;
    const maxPadding = "0000";
    const number = (Math.floor(Math.random()*maxNumber)).toString()
    const newSeed =  maxPadding.substring(number.length) + number;
    return newSeed;
}
export type GameState = 
{
    seed: string;
    boysCalled?: Name[];
}
export class Game {
    get Seed(): string {
        return this._currentSeed;
    }

  
    private readonly _currentSeed: string;
    get boysRang(): Name[] {
        return this._boysRang;
    }
    

    setBoy(value: Name) {
        this._crushBoy = boys[value];
        this._crushBoyName = value;
    }

    get crushBoy(): TBoy {
        return this._crushBoy;
    }
    private _crushBoy: TBoy;
    private _crushBoyName: Name;
    private rand: Rand;
    clueIndexes: Record<ClueTypes, number>;
    private _boysRang:Name[];
    public onBoysRang?: () => void ;
    
    private RandInt(max:number):number
    {
        return Math.floor(this.rand.next() * max);
    }
    getNewSeed():string
    {
        return newGameSeed();
        
    }
    
    getSaveState() : GameState
    {
        return {
            boysCalled: this._boysRang, seed: this._currentSeed
        }
    }
   
    constructor(saveState?: GameState)
    {
        const seed = saveState?.seed;
        if(seed && seed.length > 3) {
            this._currentSeed = seed;
        }
        else {
            this._currentSeed = this.getNewSeed();
        }
                
        this.rand = new Rand(this._currentSeed);
        const chosenBoyIndex = this.RandInt(numberOfBoys) as Name

        this._crushBoy = boys[chosenBoyIndex];
        this._crushBoyName = chosenBoyIndex;
        this.setBoy(chosenBoyIndex);
        this._boysRang = [];
        this.clueIndexes =
            {
                [ClueTypes.BoardLocation]:this.getRandomEnumIndex(BoardLocation),
                [ClueTypes.Sport]: this.getRandomEnumIndex(Sport),
                [ClueTypes.Food]:  this.getRandomEnumIndex(Food),
                [ClueTypes.Clothes]: this.getRandomEnumIndex(Clothes),
            };
        
        if(saveState)
            this.replayState(saveState.boysCalled)

    }

    replayState(boysRangBefore?: Name[] ) {
        
        if(boysRangBefore)
        {
            //replay game state
            this._boysRang = boysRangBefore;
            this._boysRang.forEach( (boy) => this.getClueFromBoy(boy));
        }
    }
    getRandomEnumIndex(theEnum: any)
    {
        return this.RandInt(EnumToStringArray(theEnum).length-1);
    }
    
    getEnumClue(theEnum: any, clueType:ClueTypes, boyValue:any|undefined):string
    {
        const index = this.clueIndexes[clueType];
        const enumValues:any = boyValue ?  EnumToStringArrayWithout(theEnum,  boyValue) : EnumToStringArray(theEnum);     
        let enumValueAsString = enumValues[index];

        this.clueIndexes[clueType]++;
        if(this.clueIndexes[clueType] >= enumValues.length)
        {
            this.clueIndexes[clueType] = 0;
        }
        enumValueAsString = enumValueAsString.replace("_", " ");
        return enumValueAsString;
    }
    
    
    getLocationClue():string
    {        
        return `he doesnt hang out at the ${this.getEnumClue(BoardLocation, ClueTypes.BoardLocation, this._crushBoy.location)}`;
    }
    getSportClue():string
    {      
        return `he is not interested in ${this.getEnumClue(Sport, ClueTypes.Sport, this._crushBoy.sport)}`;
    }
    getFoodClue():string
    {       
        return `he doesnt eat ${this.getEnumClue(Food, ClueTypes.Food, this._crushBoy.food)}`;
    }
    getClothesClue():string
    { 
        return `he doesnt wear ${this.getEnumClue(Clothes,ClueTypes.Clothes,  this._crushBoy.wears)}`;
    }
    
    getClueType(boyCalled:Name):ClueTypes
    {
        /*
       The boys from John to Nick will give a clue about the hang out location. 
       Adam through Tyler will give clues about sports.
       Paul through Jason will give out clues about food. 
       Will through James will give out clues about clothing.
        */
        switch (boyCalled)
        {
            case Name.John:
            case Name.Luke:
            case Name.Michael:
            case Name.Harry:
            case Name.Ben:
            case Name.Nick:
                return ClueTypes.BoardLocation;
            case Name.Adam:
            case Name.Josh:
            case Name.Patrick:
            case Name.Peter:
            case Name.Anthony:
            case Name.Tyler:
                return ClueTypes.Sport;
            case Name.Paul:
            case Name.Mark:
            case Name.David:
            case Name.Jack:
            case Name.Tom:
            case Name.Jason:
                return ClueTypes.Food;
            case Name.Will:
            case Name.Chris:
            case Name.Brandon:
            case Name.Matt:
            case Name.Alex:
            case Name.James:
                return ClueTypes.Clothes;
            

        }
    }

    getClueFromBoy(boyCalled:Name):string{ 
       
        const clueType = this.getClueType(boyCalled);

        return this.getClue(clueType);
    }

    getClue(clueType: ClueTypes) {
        switch (clueType) {
            case ClueTypes.BoardLocation:
                return this.getLocationClue();
            case ClueTypes.Sport:
                return this.getSportClue();
            case ClueTypes.Food:
                return this.getFoodClue();
            case ClueTypes.Clothes:
                return this.getClothesClue();

        }

        return "Sorry not saying anything";
    }
    
    phone(expectedNumber: string):Name {
        return phoneNumbers[expectedNumber];
    }
    
    phoneANumberForAClue(number:string):PhoneClue {
        
        const boy = this.phone(number);
        //updateBoysRang(boy);
        
        if(boy) {
            if (this.onBoysRang) {
                this.onBoysRang()
            }
            this._boysRang.push(boy);
            const clue = this.getClueFromBoy(boy);
            const boyName = Name[boy]
            return {message:clue, nameOfBoy:boyName};
        }
        return {message:"Sorry wrong number"};
    }
  
    getPhoneNumber(boy:Name) : string
    {
        return (Object.keys(phoneNumbers)).find(key => phoneNumbers[key] === boy) ??"";
    }
    guessFromNumber(guess:string)
    {
        const boyName = this.phone(guess)
        return this.guessBoy(boyName);
    }
    guessFromName(guess: string) {
        const boyNameGuessed:Name = BoyNameToEnum(guess);
        return this.guessBoy(boyNameGuessed);

    }
    getAnswer():string
    {    
        const boyName = this._crushBoyName;    
       
        return `${Name[boyName]}`;
    }

     guessBoy(boyNameGuessed: Name) {
        const boyGuessed = boys[boyNameGuessed]       

        return this.crushBoy === boyGuessed;
    }
}
