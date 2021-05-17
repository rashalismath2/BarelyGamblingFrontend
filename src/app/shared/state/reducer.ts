import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ILoginDto } from "../../root/Entities/ILoginDto";


import * as fromRoot from "../../root/state/app.state"

import { AuthenticationActions, AuthenticationActionTypes } from "./authentication.actions";

export interface State extends fromRoot.State{
    shared:SharedState
}

export interface SharedState{
   authentication:{
        AuthUser:ILoginDto,
        errorMessage:string,
        authenticationIsInProcess:boolean
   }
}

const initialState:SharedState={
    authentication:{
        AuthUser:null ||  JSON.parse(localStorage.getItem('auth_user')),
        errorMessage:null,
        authenticationIsInProcess:false
    }
}


// Selectors
const getAuthFutureState=createFeatureSelector<SharedState>("shared");

export const getAuthUser=createSelector(
    getAuthFutureState,
    state=>state.authentication.AuthUser
)
export const getAuthErrorMessage=createSelector(
    getAuthFutureState,
    state=>state.authentication.errorMessage
)
export const getAuthenticationState=createSelector(
    getAuthFutureState,
    state=>state.authentication.authenticationIsInProcess
)



export function reducer(state=initialState,action:AuthenticationActions):SharedState{
    switch (action.type) {
        case AuthenticationActionTypes.Login:
            return {
                ...state,
                authentication:{
                    ...state.authentication,
                    errorMessage:null,
                    authenticationIsInProcess:true
                }
            }
        case AuthenticationActionTypes.LoginSuccess:
            return {
                ...state,
                authentication:{
                    ...state.authentication,
                    errorMessage:null,
                    AuthUser:action.payload,
                    authenticationIsInProcess:false
                }
            }
        case AuthenticationActionTypes.LoginFailiure:
            return {
                ...state,
                authentication:{
                    ...state.authentication,
                    AuthUser:null,
                    errorMessage:"Please enter valid information",
                    authenticationIsInProcess:false
                }
            }

        case AuthenticationActionTypes.Signup:
            return {
                ...state,
                authentication:{
                    ...state.authentication,
                    errorMessage:null,
                    authenticationIsInProcess:true
                }
            }
        case AuthenticationActionTypes.SignupSuccess:
            return {
                ...state,
                authentication:{
                    ...state.authentication,
                    authenticationIsInProcess:false
                }
            }
        case AuthenticationActionTypes.LoginFailiure:
            return {
                ...state,
                authentication:{
                    ...state.authentication,
                    errorMessage:"Please enter valid information",
                    authenticationIsInProcess:false
                }
            }
        default:
            return state;
    }
}