import { IUser } from "./IUser";

export interface ILoginDto{
    token:string
    expiration:Date
    user:IUser
}