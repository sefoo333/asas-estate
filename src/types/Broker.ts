import { User } from "./User";


export interface Rate {
    id:string;
    BrokerId:string;
    massege:string;
    createdAt:Date;
    rating:string;
    userId:string
    User:User
    broker:Broker
}
export interface Broker {
    id: number;
    userName:string;
    company:string;
    languages:string[];
    location:string;
    propertiesCount:number;
    locationCode:string;
    bio:string;
    rating:number;
    ratingSum:number;
    reviewsCount:number;
    rates:Rate[];
}