import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromRoot from "../../root/state/app.state"
import { IUser } from "../Entities/IUser";

import { UserActions, UserActionTypes } from "./user.action";

export interface State extends fromRoot.State{
    users:UsersState
}

export interface UsersState{
   searchedUsers:{
       users:IUser[],
       element:string,
       loadError:string
   }
}

const initialState:UsersState={

    searchedUsers:{
        users:[],
        element:null,
        loadError:null
    }
}


// Selectors
const getUsersFutureState=createFeatureSelector<UsersState>("users");

export const getSearchedUsers=createSelector(
    getUsersFutureState,
    state=>state.searchedUsers
)



export function reducer(state=initialState,action:UserActions):UsersState{
    switch (action.type) {
        case UserActionTypes.LoadUserByEmail:
            return {
                ...state,
                searchedUsers:{
                    ...state.searchedUsers,
                    users:[],
                    element:action.payload.element,
                    loadError:null
                }
            }
        case UserActionTypes.LoadUserByEmailSuccess:
            return {
                ...state,
                searchedUsers:{
                    ...state.searchedUsers,
                    users:action.payload
                }
            }
        case UserActionTypes.LoadUserByEmailFailure:
            return {
                ...state,
                searchedUsers:{
                    ...state.searchedUsers,
                    loadError:action.payload
                }
            }
        default:
            return state;
    }
}