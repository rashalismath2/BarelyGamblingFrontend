import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import * as usrActions from "./user.action"
import {UsersService} from "../services/users.service"
import { SearchedUser } from "../Entities/SearchedUser";
import { IUser } from "../Entities/IUser";
import { Action } from "@ngrx/store";

@Injectable()
export class UserEffects{

    constructor(private actions$:Actions,private usersService:UsersService){
        
    }

    @Effect()
    loadUserByEmail$:Observable<Action>=this.actions$.pipe(
        ofType(usrActions.UserActionTypes.LoadUserByEmail),
        map((action:usrActions.LoadUserByEmail)=>action.payload),
        switchMap((searchedUser:SearchedUser)=>
            this.usersService.getUsersByEmail(searchedUser.email).pipe(
                map((loadedUsers:IUser[])=>(new usrActions.LoadUserByEmailSuccess(loadedUsers))),
                catchError(error=>of(new usrActions.LoadUserByEmailFailure(error)))
            )
        )
    )
}