import { ISignUpInput } from "./ISignupInput";

export class SignupInput implements ISignUpInput{
   
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    profilePicture: any;

    constructor(email:string,password:string,firstName:string,lastName:string,profilePicture:any) {
        this.email=email;
        this.password=password
        this.firstName=firstName
        this.lastName=lastName
        this.profilePicture=profilePicture
    }
}