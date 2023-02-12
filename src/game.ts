import Rand from 'rand-seed';
import {Name, phoneNumbers} from "./phoneNumbers";
import {BoardLocation, Clothes, ClueTypes, Food, Sport} from "./clueEnums";
import {boys, type TBoy} from "./boys";




export function BoyNameToEnum(name:string):Name
{  
    const typedName = name as keyof typeof Name;
    return Name[typedName];
}
export function EnumToStringArrayWithout(anEnum:any, element:any) {

    return Object.keys(anEnum)
        .filter(value => !isNaN(Number(value)))
        .filter( value => value != element)
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


const numberOfBoys = Object.keys(boys).length;

export class Game {
    setBoy(value: Name) {
        this._crushBoy = boys[value];
    }

    get crushBoy(): TBoy {
        return this._crushBoy;
    }
    private _crushBoy: TBoy;
    

    clueIndexes: Record<ClueTypes, number> =
        {
            [ClueTypes.BoardLocation]: 0,
            [ClueTypes.Sport]: 0,
            [ClueTypes.Food]: 0,
            [ClueTypes.Clothes]: 0
        };
    private rand: Rand;
    private RandInt(max:number):number
    {
        return Math.floor(this.rand.next() * max);
    }
    constructor(seed:string)
    {
        this.rand = new Rand(seed);
        const chosenBoyIndex = this.RandInt(numberOfBoys) as Name;
        this._crushBoy = boys[chosenBoyIndex];
        this.setBoy(chosenBoyIndex);

    }

    getEnumClue(theEnum: any, clueType:ClueTypes, boyValue:any|undefined):string
    {
        const index = this.clueIndexes[clueType];
        const enumValues:any = boyValue ?  EnumToStringArrayWithout(theEnum,  boyValue) : EnumToStringArray(theEnum);     
        const enumValueAsString = enumValues[index];

        this.clueIndexes[clueType]++;
        if(this.clueIndexes[clueType] >= enumValues.length)
        {
            this.clueIndexes[clueType] = 0;
        }
            
        return enumValueAsString;
    }
    
    
    getLocationClue():string
    {        
        return `He doesnt hang out at ${this.getEnumClue(BoardLocation, ClueTypes.BoardLocation, this._crushBoy.location)}`;
    }
    getSportClue():string
    {      
        return `He is not interested in ${this.getEnumClue(Sport, ClueTypes.Sport, this._crushBoy.sport)}`;
    }
    getFoodClue():string
    {       
        return `He doesnt eat ${this.getEnumClue(Food, ClueTypes.Food, this._crushBoy.food)}`;
    }
    getClothesClue():string
    { 
        return `He doesnt wear ${this.getEnumClue(Clothes,ClueTypes.Clothes,  this._crushBoy.wears)}`;
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
    phoneClue(expectedNumber: string)
    {
        return this.getClueFromBoy(this.phone(expectedNumber));
    }
    getPhoneNumber(boy:Name) : string
    {
        return (Object.keys(phoneNumbers)).find(key => phoneNumbers[key] === boy) ??"";
    }

    guess(guess: string) {
        const boyNameGuessed:Name = BoyNameToEnum(guess);
        const boyGuessed = boys[boyNameGuessed]
        console.log("Answer is:")
        console.log(this.crushBoy);
        const boyName= (Object.keys(boys)).find((key) =>       
             boys[BoyNameToEnum(key)] == this.crushBoy
        ) ?? "???";
        
        
        console.log("boys name is "+boyName);
       
        return this.crushBoy === boyGuessed;        
        
    }
}
