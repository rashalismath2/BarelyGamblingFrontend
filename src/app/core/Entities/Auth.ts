import { ISignInInput } from "./ISignInInput";


export class Auth implements ISignInInput{
    email: string;
    password: string;

    constructor(email:string,password:string) {
        this.email=email;
        this.password=password
    }
}