import { ITournament } from "./ITournament";


export interface IUser{
    id:string;
    firstName:string;
    lastName:string;
    userName:string;
    coverUrl:string;
    tournaments:ITournament[];
}