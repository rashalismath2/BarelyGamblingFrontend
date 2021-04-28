import { ITeam } from "./ITeam";
import { IUser } from "./IUser";


export interface ITournament{

    id:string;
    title:string ;
    description:string; 
    place:string; 
    startingDate:Date;
    createdAt:Date;
    tournamentPrize:number;
    teams:ITeam[];
    user:IUser;
}