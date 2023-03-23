import {BoardLocation, Clothes, Food, Sport} from "./clueEnums";
import {Name} from "./boyNames";
export type TBoy = {
    location: BoardLocation,
    sport?: Sport,
    food?:Food,
    wears?:Clothes
};
export const boys: { [id in Name]: TBoy; } = {
    [Name.John]: {
        location: BoardLocation.Gamer_Lounge,
        sport: undefined,
        food: Food.Fruit,
        wears: Clothes.Orange
    },
    [Name.Brandon]: {
        location: BoardLocation.Gamer_Lounge,
        sport: undefined,
        food: undefined,
        wears: Clothes.Shades
    },
    [Name.Mark]: {
        location: BoardLocation.Gamer_Lounge,
        sport: undefined,
        food: undefined,
        wears: Clothes.Jeans | Clothes.Sneakers
    },
    [Name.Peter]: {
        location: BoardLocation.Gamer_Lounge,
        sport: undefined,
        food: Food.Burgers,
        wears: Clothes.A_Jacket
    },
    //beach
    [Name.Michael]: {
        location: BoardLocation.Beach,
        sport: Sport.BasketBall,
        food: Food.Ice_Cream,
        wears: Clothes.Orange
    },
    [Name.David]: {
        location: BoardLocation.Beach,
        sport: Sport.Surfing,
        food: undefined,
        wears: Clothes.A_Hat
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
        wears: Clothes.A_Hat
    },
    //high school
    [Name.Nick]: {
        location: BoardLocation.High_School,
        sport: Sport.Hocky,
        food: undefined,
        wears: Clothes.Shades | Clothes.A_Jacket
    },
    [Name.Jack]: {
        location: BoardLocation.High_School,
        sport: Sport.Tennis,
        food: undefined,
        wears: Clothes.A_Hat
    },
    [Name.Tyler]: {
        location: BoardLocation.High_School,
        sport: Sport.Tennis,
        food: Food.Fruit,
        wears: Clothes.Sneakers
    },
    [Name.Patrick]: {
        location: BoardLocation.High_School,
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
        wears: Clothes.A_Hat
    },
    [Name.Will]: {
        location: BoardLocation.Cinema,
        sport: undefined,
        food: Food.Fries,
        wears: Clothes.A_Jacket | Clothes.A_Hat
    },
    [Name.Matt]: {
        location: BoardLocation.Cinema,
        sport: undefined,
        food: Food.Chocolate,
        wears: Clothes.Jeans
    },
    // Town Park
    [Name.Tom]: {
        location: BoardLocation.Town_Park,
        sport: Sport.Hocky,
        food: undefined,
        wears: undefined
    },
    [Name.Luke]: {
        location: BoardLocation.Town_Park,
        sport: Sport.Football,
        food: undefined,
        wears: Clothes.Orange
    },
    [Name.Jason]: {
        location: BoardLocation.Town_Park,
        sport: Sport.Baseball,
        food: undefined,
        wears: Clothes.Shades
    },
    [Name.Ben]: {
        location: BoardLocation.Town_Park,
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
        food: Food.Ice_Cream,
        wears: Clothes.A_Jacket
    },
    [Name.Paul]: {
        location: BoardLocation.Mall,
        sport: undefined,
        food: undefined,
        wears: Clothes.Sneakers
    }
};