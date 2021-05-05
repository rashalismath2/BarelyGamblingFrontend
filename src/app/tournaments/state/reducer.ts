import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ITournament } from "src/app/Entities/ITournament";
import { TournamentActions, TournamentActionsTypes } from "./tournaments.actions";



import * as fromRoot from "../../state/app.state"

export interface State extends fromRoot.State{
    tournaments:TournamentsState
}


export interface TournamentsState{
    tournaments:ITournament[],
    loadFailiureMessage:string
}

const initialState:TournamentsState={
    tournaments:[],
    loadFailiureMessage:""
}


// Selectors
const getTournamentFutureState=createFeatureSelector<TournamentsState>("tournaments");

export const getTournaments=createSelector(
    getTournamentFutureState,
    state=>state.tournaments
)




export function reducer(state=initialState,action:TournamentActions):TournamentsState{
        switch (action.type) {
            case TournamentActionsTypes.LoadSuccess: 
                return {
                    ...state,
                    tournaments:action.payload,
                    loadFailiureMessage:""
                }
            case TournamentActionsTypes.LoadFailiure: 
                return {
                    ...state,
                    tournaments:[],
                    loadFailiureMessage:action.payload
                }
            default:
                return state;
        }
}