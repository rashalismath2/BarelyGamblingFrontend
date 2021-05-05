import { IAuth } from "./IAuth";
import { ITournament } from "./ITournament";


export interface IUser extends IAuth{
    id:string;
    firstName:string;
    lastName:string;
    userName:string;
    coverUrl:string;
    tournaments:ITournament[];
}