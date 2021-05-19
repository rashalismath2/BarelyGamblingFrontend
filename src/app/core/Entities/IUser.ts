import { ISignInInput } from "./ISignInInput";
import { ITournament } from "./ITournament";


export interface IUser extends ISignInInput{
    id:string;
    firstName:string;
    lastName:string;
    userName:string;
    coverUrl:string;
    tournaments:ITournament[];
}