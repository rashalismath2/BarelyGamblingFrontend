import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ISignIn } from "src/app/Entities/ISignIn";


import * as fromRoot from "../../state/app.state"

import { AuthenticationActions, AuthenticationActionTypes } from "./authentication.actions";

export interface State extends fromRoot.State{
    authentication:AuthState
}

export interface AuthState{
    AuthUser:ISignIn,
    errorMessage:string,
    authenticationIsInProcess:boolean
}

const initialState:AuthState={
    AuthUser:null ||  JSON.parse(localStorage.getItem('auth_user')),
    errorMessage:null,
    authenticationIsInProcess:false
}


// Selectors
const getAuthFutureState=createFeatureSelector<AuthState>("authentication");

export const getAuthUser=createSelector(
    getAuthFutureState,
    state=>state.AuthUser
)
export const getAuthErrorMessage=createSelector(
    getAuthFutureState,
    state=>state.errorMessage
)
export const getAuthenticationState=createSelector(
    getAuthFutureState,
    state=>state.authenticationIsInProcess
)



export function reducer(state=initialState,action:AuthenticationActions):AuthState{
    switch (action.type) {
        case AuthenticationActionTypes.Login:
            return {
                ...state,
                errorMessage:null,
                authenticationIsInProcess:true
            }
        case AuthenticationActionTypes.LoginSuccess:
            return {
                ...state,
                errorMessage:null,
                AuthUser:action.payload,
                authenticationIsInProcess:false
            }
        case AuthenticationActionTypes.LoginFailiure:
            return {
                ...state,
                AuthUser:null,
                errorMessage:"Please enter valid information",
                authenticationIsInProcess:false
            }
        default:
            return state;
    }
}