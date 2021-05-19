import { Action } from "@ngrx/store";
import { ISignInInput } from "../../core/Entities/ISignInInput";
import { ILoginDto } from "../../core/Entities/ILoginDto";


export enum AuthenticationActionTypes{
    Login="[authentications] Login",
    LoginSuccess="[authentications] LoginSuccess",
    LoginFailiure="[authentications] LoginFailiure",

    Signup="[authentications] Signup",
    SignupSuccess="[authentications] SignupSuccess",
    SignupFailiure="[authentications] SignupFailiure",

    Logout="[authentication] Logout",
    LogoutSuccess="[authentication] Logout success",
}


export class Login implements Action{
    readonly type=AuthenticationActionTypes.Login;
    constructor(public payload:ISignInInput) {  }
}
export class LoginSuccess implements Action{
    readonly type=AuthenticationActionTypes.LoginSuccess;
    constructor(public payload:ILoginDto) {  }
}
export class LoginFailiure implements Action{
    readonly type=AuthenticationActionTypes.LoginFailiure;
    constructor(public payload:string) {  }
}

export class Signup implements Action{
    readonly type=AuthenticationActionTypes.Signup;
    constructor(public payload:ISignInInput) {  }
}
export class SignupSuccess implements Action{
    readonly type=AuthenticationActionTypes.SignupSuccess;
    constructor(public payload:string) {  }
}
export class SignupFailiure implements Action{
    readonly type=AuthenticationActionTypes.SignupFailiure;
    constructor(public payload:string) {  }
}

export class Logout implements Action{
    readonly type=AuthenticationActionTypes.Logout;
    constructor() {  }
}
export class LogoutSuccess implements Action{
    readonly type=AuthenticationActionTypes.LogoutSuccess;
    constructor() {  }
}

export type AuthenticationActions=Login
                            |LoginSuccess
                            |LoginFailiure
                            |Signup
                            |SignupSuccess
                            |SignupFailiure
                            |Logout
                            |LogoutSuccess
                            ;