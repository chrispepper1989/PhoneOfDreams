enum Location {
    Cinema,
    HighSchool,
    TownPark,
    Mall,
    GamerLounge,
    Beach,
}
enum Sport
{
    Baseball,
    Hocky,
    Surfing,
    Football,
    Tennis,
    BasketBall
}
enum Food
{
    IceCream,
    Fruit,
    Chocolate,
    Burgers,
    Fries,
    Pizza,
}
enum Clothes
{
    Jeans,
    Sneakers,
    Shades,
    Jacket,
    Hat,
    Orange
}
enum Names
{
    //Gamer
    John,
    Brandon,
    Mark,
    Peter,
    
    //Beach
    Michael,
    David,
    Josh,
    Alex,
    
    //Buckly
    Nick,
    Jack,
    Tyler,
    Patrick,
    
    //Theater
    Anthony,
    James,
    Will,
    Matt,
    
    //Town Park
    Tom,
    Luke,
    Jason,
    Ben,
    
    //Mall,
    Adam,
    Chris,
    Harry,
    Paul,
    
}

type Boy = {
    location: Location,
    sport?: Sport,
    food?:Food,
    wears?:Clothes
};