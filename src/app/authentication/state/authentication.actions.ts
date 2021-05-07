import { Action } from "@ngrx/store";
import { IAuth } from "src/app/Entities/IAuth";
import { ISignIn } from "src/app/Entities/ISignIn";


export enum AuthenticationActionTypes{
    Login="[authentications] Login",
    LoginSuccess="[authentications] LoginSuccess",
    LoginFailiure="[authentications] LoginFailiure",
}


export class Login implements Action{
    readonly type=AuthenticationActionTypes.Login;
    constructor(public payload:IAuth) {  }
}
export class LoginSuccess implements Action{
    readonly type=AuthenticationActionTypes.LoginSuccess;
    constructor(public payload:ISignIn) {  }
}
export class LoginFailiure implements Action{
    readonly type=AuthenticationActionTypes.LoginFailiure;
    constructor(public payload:string) {  }
}

export type AuthenticationActions=Login
                            |LoginSuccess
                            |LoginFailiure;