import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ISignIn } from "src/app/Entities/ISignIn";


import * as fromRoot from "../../state/app.state"

import { AuthenticationActions, AuthenticationActionTypes } from "./authentication.actions";

export interface State extends fromRoot.State{
    authentication:AuthState
}

export interface AuthState{
    AuthUser:ISignIn
}

const initialState:AuthState={
    AuthUser:null ||  JSON.parse(localStorage.getItem('auth_user'))
}


// Selectors
const getAuthFutureState=createFeatureSelector<AuthState>("authentication");

export const getAuthUser=createSelector(
    getAuthFutureState,
    state=>state.AuthUser
)



export function reducer(state=initialState,action:AuthenticationActions):AuthState{
    switch (action.type) {
        case AuthenticationActionTypes.SetUser:
            //TODO - setup user to the localstorage
            localStorage.setItem("auth_user",JSON.stringify(action.payload))
            return {
                ...state,
                AuthUser:action.payload
            }
        default:
            return state;
    }
}