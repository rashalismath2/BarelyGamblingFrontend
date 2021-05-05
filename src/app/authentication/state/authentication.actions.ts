import { Action } from "@ngrx/store";
import { ISignIn } from "src/app/Entities/ISignIn";


export enum AuthenticationActionTypes{
    SetUser="[authentications] Set user"
}

export class SetUser implements Action{
    readonly type=AuthenticationActionTypes.SetUser;
    constructor(public payload:ISignIn) {  }
}

export type AuthenticationActions=SetUser;