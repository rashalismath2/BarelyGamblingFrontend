import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { IAuth } from "src/app/Entities/IAuth";
import { AuthenticationService } from "../services/authentication.service";

import * as fromActions from "./authentication.actions"


@Injectable()
export class AuthenticationEffect{

    constructor(
        private actions$:Actions,
        private authService:AuthenticationService,
        private router:Router
        ) {

    }

    @Effect()
    login$:Observable<Action>=this.actions$.pipe(
        ofType(fromActions.AuthenticationActionTypes.Login),
        map((action:fromActions.Login)=>action.payload),
        switchMap((user:IAuth)=>
            this.authService.signIn(user).pipe(
                map(signedInUser=>(new fromActions.LoginSuccess(signedInUser))),
                catchError(error=>of(new fromActions.LoginFailiure(error)))
            )
        )
    )

    @Effect({ dispatch: false })
    logInSuccess$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.AuthenticationActionTypes.LoginSuccess),
    tap((user) => {
        localStorage.setItem("auth_user",JSON.stringify(user.payload))
        this.router.navigate(["/"],{queryParams:{loginSuccess:"Login was successful"}});
    })
    );


}