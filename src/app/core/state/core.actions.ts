import { Action } from "@ngrx/store";
import { ISignInInput } from "../Entities/ISignInInput";
import { ILoginDto } from "../Entities/ILoginDto";
import { SearchedUser } from "../Entities/SearchedUser";
import { IUser } from "../Entities/IUser";
import { UpdateUserDto } from "../Entities/UpdateUserDto";


export enum CoreActionTypes{
    Login="[authentications] Login",
    LoginSuccess="[authentications] LoginSuccess",
    LoginFailiure="[authentications] LoginFailiure",

    Signup="[authentications] Signup",
    SignupSuccess="[authentications] SignupSuccess",
    SignupFailiure="[authentications] SignupFailiure",

    Logout="[authentication] Logout",
    LogoutSuccess="[authentication] Logout success",

    LoadUserByEmail="[user] LoadUserByEmail",
    LoadUserByEmailSuccess="[user] LoadUserByEmailSuccess",
    LoadUserByEmailFailure="[user] LoadUserByEmailFailure",

    UpdateUserDetails="[user] UpdateUserDetails",
    UpdateUserDetailsSuccess="[user] UpdateUserDetailsSuccess",
    UpdateUserDetailsFailure="[user] UpdateUserDetailsFailure",
}


export class Login implements Action{
    readonly type=CoreActionTypes.Login;
    constructor(public payload:ISignInInput) {  }
}
export class LoginSuccess implements Action{
    readonly type=CoreActionTypes.LoginSuccess;
    constructor(public payload:ILoginDto) {  }
}
export class LoginFailiure implements Action{
    readonly type=CoreActionTypes.LoginFailiure;
    constructor(public payload:string) {  }
}

export class Signup implements Action{
    readonly type=CoreActionTypes.Signup;
    constructor(public payload:ISignInInput) {  }
}
export class SignupSuccess implements Action{
    readonly type=CoreActionTypes.SignupSuccess;
    constructor(public payload:string) {  }
}
export class SignupFailiure implements Action{
    readonly type=CoreActionTypes.SignupFailiure;
    constructor(public payload:string) {  }
}

export class Logout implements Action{
    readonly type=CoreActionTypes.Logout;
    constructor() {  }
}
export class LogoutSuccess implements Action{
    readonly type=CoreActionTypes.LogoutSuccess;
    constructor() {  }
}

export class LoadUserByEmail implements Action{
    readonly type=CoreActionTypes.LoadUserByEmail;
    constructor(public payload:SearchedUser) {  }
}
export class LoadUserByEmailSuccess implements Action{
    readonly type=CoreActionTypes.LoadUserByEmailSuccess;
    constructor(public payload:IUser[]) {  }
}
export class LoadUserByEmailFailure implements Action{
    readonly type=CoreActionTypes.LoadUserByEmailFailure;
    constructor(public payload:string) {  }
}

export class UpdateUserDetails implements Action{
    readonly type=CoreActionTypes.UpdateUserDetails;
    constructor(public payload:UpdateUserDto) {  }
}
export class UpdateUserDetailsSuccess implements Action{
    readonly type=CoreActionTypes.UpdateUserDetailsSuccess;
    constructor(public payload:IUser) {  }
}
export class UpdateUserDetailsFailure implements Action{
    readonly type=CoreActionTypes.UpdateUserDetailsFailure;
    constructor(public payload:string) {  }
}


export type CoreActions=Login
                            |LoginSuccess
                            |LoginFailiure
                            |Signup
                            |SignupSuccess
                            |SignupFailiure
                            |Logout
                            |LogoutSuccess
                            |LoadUserByEmail 
                            |LoadUserByEmailSuccess 
                            |LoadUserByEmailFailure
                            |UpdateUserDetails 
                            |UpdateUserDetailsSuccess 
                            |UpdateUserDetailsFailure
                            ;