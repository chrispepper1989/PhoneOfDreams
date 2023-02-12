import Rand from 'rand-seed';
import {Name, phoneNumbers} from "./phoneNumbers";
import {BoardLocation, Clothes, Food, Sport} from "./clueEnums";


type TBoy = {
    location: BoardLocation,
    sport?: Sport,
    food?:Food,
    wears?:Clothes
};

export function BoyNameToEnum(name:string):Name
{  
    const typedName = name as keyof typeof Name;
    return Name[typedName];
}
function EnumToStringArrayWithout(anEnum:any, element:any) {

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


export const boys: { [id in Name] : TBoy; } = {
    [Name.John]: {
        location: BoardLocation.GamerLounge,
        sport: undefined,
        food: Food.Fruit,
        wears: Clothes.Orange
    },
    [Name.Brandon]: {
        location: BoardLocation.GamerLounge,
        sport: undefined,
        food: undefined,
        wears: Clothes.Shades
    },
    [Name.Mark]: {
        location: BoardLocation.GamerLounge,
        sport: undefined,
        food: undefined,
        wears: Clothes.Jeans | Clothes.Sneakers
    },
    [Name.Peter]: {
        location: BoardLocation.GamerLounge,
        sport: undefined,
        food: Food.Burgers,
        wears: Clothes.Jacket
    },
    //beach
    [Name.Michael]: {
        location: BoardLocation.Beach,
        sport: Sport.BasketBall,
        food: Food.IceCream,
        wears: Clothes.Orange
    },
    [Name.David]: {
        location: BoardLocation.Beach,
        sport: Sport.Surfing,
        food: undefined,
        wears: Clothes.Hat
    },
    [Name.Josh]: {
        location: BoardLocation.Beach,
        sport: Sport.Surfing,
        food: undefined,
        wears: Clothes.Shades
    },
    [Name.Alex]: {
        location: BoardLocation.Beach,
        sport: Sport.BasketBall,
        food: undefined,
        wears: Clothes.Hat
    },
    //high school
    [Name.Nick]: {
        location: BoardLocation.HighSchool,
        sport: Sport.Hocky,
        food: undefined,
        wears: Clothes.Shades | Clothes.Jacket
    },
    [Name.Jack]: {
        location: BoardLocation.HighSchool,
        sport: Sport.Tennis,
        food: undefined,
        wears: Clothes.Hat
    },
    [Name.Tyler]: {
        location: BoardLocation.HighSchool,
        sport: Sport.Tennis,
        food: Food.Fruit,
        wears: Clothes.Sneakers
    },
    [Name.Patrick]: {
        location: BoardLocation.HighSchool,
        sport: Sport.Baseball,
        food: undefined,
        wears: Clothes.Jeans
    },
    //cinema
    [Name.Anthony]: {
        location: BoardLocation.Cinema,
        sport: undefined,
        food: Food.Chocolate,
        wears: Clothes.Orange
    },
    [Name.James]: {
        location: BoardLocation.Cinema,
        sport: undefined,
        food: Food.Pizza,
        wears: Clothes.Hat
    },
    [Name.Will]: {
        location: BoardLocation.Cinema,
        sport: undefined,
        food: Food.Fries,
        wears: Clothes.Jacket | Clothes.Hat
    },
    [Name.Matt]: {
        location: BoardLocation.Cinema,
        sport: undefined,
        food: Food.Chocolate,
        wears: Clothes.Jeans
    },
    // Town Park
    [Name.Tom]: {
        location: BoardLocation.TownPark,
        sport: Sport.Hocky,
        food: undefined,
        wears: undefined
    },
    [Name.Luke]: {
        location: BoardLocation.TownPark,
        sport: Sport.Football,
        food: undefined,
        wears: Clothes.Orange
    },
    [Name.Jason]: {
        location: BoardLocation.TownPark,
        sport: Sport.Baseball,
        food: undefined,
        wears: Clothes.Shades
    },
    [Name.Ben]: {
        location: BoardLocation.TownPark,
        sport: Sport.Football,
        food: Food.Fries,
        wears: Clothes.Sneakers
    },
    //mall
    [Name.Adam]: {
        location: BoardLocation.Mall,
        sport: undefined,
        food: Food.Pizza,
        wears: undefined
    },
    [Name.Chris]: {
        location: BoardLocation.Mall,
        sport: undefined,
        food: Food.Burgers,
        wears: Clothes.Jeans
    },
    [Name.Harry]: {
        location: BoardLocation.Mall,
        sport: undefined,
        food: Food.IceCream,
        wears: Clothes.Jacket
    },
    [Name.Paul]: {
        location: BoardLocation.Mall,
        sport: undefined,
        food: undefined,
        wears: Clothes.Sneakers
    }
};

const numberOfBoys = Object.keys(boys).length;

export class Game {
    setBoy(value: Name) {
        this._chosenBoy = boys[value];
    }

    get chosenBoy(): TBoy {
        return this._chosenBoy;
    }
    private _chosenBoy: TBoy;
    private rand: Rand;
    private RandInt(max:number):number
    {
        return Math.floor(this.rand.next() * max);
    }
    constructor(seed:string)
    {
        this.rand = new Rand(seed);
        const chosenBoyIndex = this.RandInt(numberOfBoys) as Name;
        this._chosenBoy = boys[chosenBoyIndex];
        this.setBoy(chosenBoyIndex);
    }

    getEnumClue(theEnum: any, boyValue:any|undefined):string
    {        
        let enumValues:any = [];
        enumValues = boyValue ? EnumToStringArray(theEnum) : EnumToStringArrayWithout(theEnum,  boyValue);
        const enumValueIndex = this.RandInt(enumValues.length);
        const enumValueAsString = enumValues[enumValueIndex];
        return enumValueAsString;
    }
    getLocationClue():string
    {
        return `He doesnt hang out at ${this.getEnumClue(BoardLocation,  this._chosenBoy.location)}`;
    }
    getSportClue():string
    {
        return `He doesnt play ${this.getEnumClue(Sport,  this._chosenBoy.sport)}`;
    }
    getFoodClue():string
    {
        return `He doesnt eat ${this.getEnumClue(Food,  this._chosenBoy.food)}`;
    }
    getClothesClue():string
    {
        return `He doesnt wear ${this.getEnumClue(Clothes,  this._chosenBoy.wears)}`;
    }
    
    getClue(boyCalled:Name):string{ 
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
                return this.getLocationClue();
            case Name.Adam:
            case Name.Josh:
            case Name.Patrick:
            case Name.Peter:
            case Name.Anthony:
            case Name.Tyler:
                return this.getSportClue();
            case Name.Paul:
            case Name.Mark:
            case Name.David:
            case Name.Jack:
            case Name.Tom:
            case Name.Jason:
                return this.getFoodClue();
            case Name.Will:
            case Name.Chris:
            case Name.Brandon:
            case Name.Matt:
            case Name.Alex:
            case Name.James:
                return  this.getClothesClue();

        }
        
        return  "Sorry not saying anything";
    }

    phone(expectedNumber: string):Name {
        return phoneNumbers[expectedNumber];
    }
    phoneClue(expectedNumber: string)
    {
        return this.getClue(this.phone(expectedNumber));
    }
    getPhoneNumber(boy:Name) : string
    {
        return (Object.keys(phoneNumbers)).find(key => phoneNumbers[key] === boy) ??"";
    }
}
