import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { ISignInInput } from "../../root/Entities/ISignInInput";
import { ISignUpInput } from "../../root/Entities/ISignupInput";
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
        switchMap((user:ISignInInput)=>
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
        this.router.navigate(["/home"],{queryParams:{loginSuccess:"Login was successful"}});
    })
    );

    @Effect()
    signup$:Observable<Action>=this.actions$.pipe(
        ofType(fromActions.AuthenticationActionTypes.Signup),
        map((action:fromActions.Signup)=>action.payload),
        switchMap((formData:ISignUpInput)=>
            this.authService.signUp(formData).pipe(
                map((message)=>(new fromActions.SignupSuccess("Signup was successful. Please login to continue"))),
                catchError(error=>of(new fromActions.SignupFailiure(error)))
            )
        )
    )

    @Effect({ dispatch: false })
    signupSuccess$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.AuthenticationActionTypes.SignupSuccess),
    tap((user) => {
        this.router.navigate(["/login"],{queryParams:{loginSuccess:"Signup was successful. Please login to continue"}});
    })
    );

}