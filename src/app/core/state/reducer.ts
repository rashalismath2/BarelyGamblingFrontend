import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ILoginDto } from "../../core/Entities/ILoginDto";


import * as fromRoot from "../../root/state/app.state"

import { AuthenticationActions, AuthenticationActionTypes } from "./authentication.actions";

export interface State extends fromRoot.State{
    core:CoreState
}

export interface CoreState{
   authentication:{
        AuthUser:ILoginDto,
        errorMessage:string,
        authenticationIsInProcess:boolean,
        logingOutIsOnProcess:boolean,
   }
}

const initialState:CoreState={
    authentication:{
        AuthUser:null ||  JSON.parse(localStorage.getItem('auth_user')),
        errorMessage:null,
        authenticationIsInProcess:false,
        logingOutIsOnProcess:false
    }
}


// Selectors
const getAuthFutureState=createFeatureSelector<CoreState>("core");

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
export const getSignOutState=createSelector(
    getAuthFutureState,
    state=>state.authentication.logingOutIsOnProcess
)



export function reducer(state=initialState,action:AuthenticationActions):CoreState{
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
        case AuthenticationActionTypes.SignupFailiure:
            return {
                ...state,
                authentication:{
                    ...state.authentication,
                    errorMessage:"Please enter valid information",
                    authenticationIsInProcess:false
                }
            }
        case AuthenticationActionTypes.Logout:
            return {
                ...state,
                authentication:{
                    ...state.authentication,
                    AuthUser:null,
                    logingOutIsOnProcess:true
                }
            }
        case AuthenticationActionTypes.LogoutSuccess:
            return {
                ...state,
                authentication:{
                    ...state.authentication,
                    logingOutIsOnProcess:false
                }
            }
        default:
            return state;
    }
}