import { IUser } from "src/app/Entities/IUser";

export interface ISignIn{
    token:string
    expiration:Date
    user:IUser
}