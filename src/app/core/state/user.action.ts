import { Action } from "@ngrx/store";
import { IUser } from "../Entities/IUser";
import { SearchedUser } from "../Entities/SearchedUser";


export enum UserActionTypes{
    LoadUserByEmail="[user] LoadUserByEmail",
    LoadUserByEmailSuccess="[user] LoadUserByEmailSuccess",
    LoadUserByEmailFailure="[user] LoadUserByEmailFailure",
}

export class LoadUserByEmail implements Action{
    readonly type=UserActionTypes.LoadUserByEmail;
    constructor(public payload:SearchedUser) {  }
}
export class LoadUserByEmailSuccess implements Action{
    readonly type=UserActionTypes.LoadUserByEmailSuccess;
    constructor(public payload:IUser[]) {  }
}
export class LoadUserByEmailFailure implements Action{
    readonly type=UserActionTypes.LoadUserByEmailFailure;
    constructor(public payload:string) {  }
}


export type UserActions=LoadUserByEmail | LoadUserByEmailSuccess | LoadUserByEmailFailure