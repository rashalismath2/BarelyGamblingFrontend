import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ILoginDto } from "../../core/Entities/ILoginDto";


import * as fromRoot from "../../root/state/app.state"
import { IUser } from "../Entities/IUser";

import { CoreActions, CoreActionTypes } from "./core.actions";

export interface State extends fromRoot.State{
    core:CoreState
}

export interface CoreState{
   authentication:{
        AuthUser:ILoginDto,
        errorMessage:string,
        authenticationIsInProcess:boolean,
        logingOutIsOnProcess:boolean,
        userDetailUpdateStatus:boolean,
        userDetailUpdateStatusSuccess:boolean,
   },
   searchedUsers:{
    users:IUser[],
    element:string,
    elementForTeamTwo:string,
    loadError:string
}
}

const initialState:CoreState={
    authentication:{
        AuthUser:null ||  JSON.parse(localStorage.getItem('auth_user')),
        errorMessage:null,
        authenticationIsInProcess:false,
        logingOutIsOnProcess:false,
        userDetailUpdateStatus:false,
        userDetailUpdateStatusSuccess:false,
    },
    searchedUsers:{
        users:[],
        element:null,
        loadError:null,
        elementForTeamTwo:null
    }
}


// Selectors
const getCoreFutureState=createFeatureSelector<CoreState>("core");

export const getAuthUser=createSelector(
    getCoreFutureState,
    state=>state.authentication.AuthUser
)
export const getAuthErrorMessage=createSelector(
    getCoreFutureState,
    state=>state.authentication.errorMessage
)
export const getAuthenticationState=createSelector(
    getCoreFutureState,
    state=>state.authentication.authenticationIsInProcess
)
export const getSignOutState=createSelector(
    getCoreFutureState,
    state=>state.authentication.logingOutIsOnProcess
)

export const getSearchedUsers=createSelector(
    getCoreFutureState,
    state=>state.searchedUsers.users
)
export const getSearchedUsersElementId=createSelector(
    getCoreFutureState,
    state=>state.searchedUsers.element
)
export const searchedUsersForTeamTwoElementId=createSelector(
    getCoreFutureState,
    state=>state.searchedUsers.elementForTeamTwo
)
export const getUserDetailUpdateStatus=createSelector(
    getCoreFutureState,
    state=>state.authentication.userDetailUpdateStatus
)
export const getUserDetailUpdateSuccessStatus=createSelector(
    getCoreFutureState,
    state=>state.authentication.userDetailUpdateStatusSuccess
)



export function reducer(state=initialState,action:CoreActions):CoreState{
    switch (action.type) {
        case CoreActionTypes.Login:
            return {
                ...state,
                authentication:{
                    ...state.authentication,
                    errorMessage:null,
                    authenticationIsInProcess:true
                }
            }
        case CoreActionTypes.LoginSuccess:
            return {
                ...state,
                authentication:{
                    ...state.authentication,
                    errorMessage:null,
                    AuthUser:action.payload,
                    authenticationIsInProcess:false
                }
            }
        case CoreActionTypes.LoginFailiure:
            return {
                ...state,
                authentication:{
                    ...state.authentication,
                    AuthUser:null,
                    errorMessage:"Please enter valid information",
                    authenticationIsInProcess:false
                }
            }

        case CoreActionTypes.Signup:
            return {
                ...state,
                authentication:{
                    ...state.authentication,
                    errorMessage:null,
                    authenticationIsInProcess:true
                }
            }
        case CoreActionTypes.SignupSuccess:
            return {
                ...state,
                authentication:{
                    ...state.authentication,
                    authenticationIsInProcess:false
                }
            }
        case CoreActionTypes.SignupFailiure:
            return {
                ...state,
                authentication:{
                    ...state.authentication,
                    errorMessage:"Please enter valid information",
                    authenticationIsInProcess:false
                }
            }
        case CoreActionTypes.Logout:
            return {
                ...state,
                authentication:{
                    ...state.authentication,
                    AuthUser:null,
                    logingOutIsOnProcess:true
                }
            }
        case CoreActionTypes.LogoutSuccess:
            return {
                ...state,
                authentication:{
                    ...state.authentication,
                    logingOutIsOnProcess:false
                }
            }
            case CoreActionTypes.LoadUserByEmail:
                if(action.payload.searchingForElement=="one"){
                    return {
                        ...state,
                        searchedUsers:{
                            ...state.searchedUsers,
                            users:[],
                            element:action.payload.element,
                            elementForTeamTwo:null,
                            loadError:null
                        }
                    }
                }
                return {
                    ...state,
                    searchedUsers:{
                        ...state.searchedUsers,
                        users:[],
                        element:null,
                        elementForTeamTwo:action.payload.elementForTeamTwo,
                        loadError:null
                    }
                }
            case CoreActionTypes.LoadUserByEmailSuccess:
                return {
                    ...state,
                    searchedUsers:{
                        ...state.searchedUsers,
                        users:action.payload
                    }
                }
            case CoreActionTypes.LoadUserByEmailFailure:
                return {
                    ...state,
                    searchedUsers:{
                        ...state.searchedUsers,
                        loadError:action.payload,
                        users:[],
                        element:null,
                        elementForTeamTwo:null,
                    }
                }
            case CoreActionTypes.UpdateUserDetails:
                return {
                    ...state,
                    authentication:{
                       ...state.authentication,
                        errorMessage:null,
                        userDetailUpdateStatus:true,
                        userDetailUpdateStatusSuccess:false
                    }
                }
            case CoreActionTypes.UpdateUserDetailsSuccess:
                return {
                    ...state,
                    authentication:{
                       ...state.authentication,
                        userDetailUpdateStatus:false,
                        userDetailUpdateStatusSuccess:true,
                       AuthUser:{
                           ...state.authentication.AuthUser,
                            user:{
                                ...state.authentication.AuthUser.user,
                                firstName:action.payload.firstName,
                                lastName:action.payload.lastName
                            }
                       }
                    }
                }
            case CoreActionTypes.UpdateUserDetailsFailure:
                return {
                    ...state,
                    authentication:{
                       ...state.authentication,
                       errorMessage:action.payload,
                       userDetailUpdateStatus:false
                    }
                }
        default:
            return state;
    }
}