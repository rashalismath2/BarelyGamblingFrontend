import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { ILoginDto } from "../Entities/ILoginDto";
import { ISignInInput } from "../Entities/ISignInInput";
import { ISignUpInput } from "../Entities/ISignupInput";
import { IUser } from "../Entities/IUser";
import { SearchedUser } from "../Entities/SearchedUser";
import { UpdateUserDto } from "../Entities/UpdateUserDto";
import { AuthenticationService } from "../services/authentication.service";
import { UsersService } from "../services/users.service";

import * as fromActions from "./core.actions"


@Injectable()
export class CoreEffect{

    constructor(
        private actions$:Actions,
        private authService:AuthenticationService,
        private router:Router,
        private usersService:UsersService
        ) {

    }

    @Effect()
    login$:Observable<Action>=this.actions$.pipe(
        ofType(fromActions.CoreActionTypes.Login),
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
        ofType(fromActions.CoreActionTypes.LoginSuccess),
        tap((user) => {
            localStorage.setItem("auth_user",JSON.stringify(user.payload))
            this.router.navigate(["/"],{queryParams:{loginSuccess:"Login was successful"}});
        })
    );

    @Effect()
    signup$:Observable<Action>=this.actions$.pipe(
        ofType(fromActions.CoreActionTypes.Signup),
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
        ofType(fromActions.CoreActionTypes.SignupSuccess),
        tap((user) => {
            this.router.navigate(["/login"],{queryParams:{signupSuccess:"Signup was successful. Please login to continue"}});
        })
    );

    @Effect()
    logout$:Observable<Action>=this.actions$.pipe(
        ofType(fromActions.CoreActionTypes.Logout),
        tap(()=>
            localStorage.removeItem("auth_user")
        ),
        switchMap(()=>{
            return of(new fromActions.LogoutSuccess())
        })
    )

    @Effect({ dispatch: false })
    logoutSuccess$:Observable<Action>=this.actions$.pipe(
        ofType(fromActions.CoreActionTypes.LogoutSuccess),
        tap(()=>{
            this.router.navigate(["/"],{queryParams:{logoutSuccess:"Signout was successful."}});
        }),
    )


    @Effect()
    loadUserByEmail$:Observable<Action>=this.actions$.pipe(
        ofType(fromActions.CoreActionTypes.LoadUserByEmail),
        map((action:fromActions.LoadUserByEmail)=>action.payload),
        switchMap((searchedUser:SearchedUser)=>
           { 
               if(searchedUser.email=="") return of(new fromActions.LoadUserByEmailFailure(""))
                return this.usersService.getUsersByEmail(searchedUser.email).pipe(
                    map((loadedUsers:IUser[])=>(new fromActions.LoadUserByEmailSuccess(loadedUsers))),
                    catchError(error=>of(new fromActions.LoadUserByEmailFailure(error)))
            )
        }
        )
    )

    @Effect()
    updateUserDetails$:Observable<Action>=this.actions$.pipe(
        ofType(fromActions.CoreActionTypes.UpdateUserDetails),
        map((action:fromActions.UpdateUserDetails)=>action.payload),
        switchMap((userDetails:UpdateUserDto)=>
        {
            return this.usersService.updateUser(userDetails).pipe(
                map((updateUser:IUser)=>(new fromActions.UpdateUserDetailsSuccess(updateUser))),
                catchError(error=>of(new fromActions.UpdateUserDetailsFailure(error)))
            )
        })
    )
    
    @Effect({ dispatch: false })
    updateUserDetailsSuccess$:Observable<void>=this.actions$.pipe(
        ofType(fromActions.CoreActionTypes.UpdateUserDetailsSuccess),
        map((action:fromActions.UpdateUserDetailsSuccess)=>{
            var user=action.payload
            var userFromLocal=JSON.parse(localStorage.getItem("auth_user"))
            userFromLocal={
                ...userFromLocal,
                user:{
                    ...userFromLocal.user,
                    firstName:user.firstName,
                    lastName:user.lastName
                }
            }
            localStorage.setItem("auth_user",JSON.stringify(userFromLocal))
        })
    )
}