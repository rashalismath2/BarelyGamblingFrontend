import { ITournament } from "./ITournament";
import { IUser } from "./IUser";

export class User implements IUser{
    password: string;
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    coverUrl: string;
    tournaments: ITournament[];

  
    public SetAuthenticationFields(email:string,password:string){
        this.email=email
        this.password=password
    }
}