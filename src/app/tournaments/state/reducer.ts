import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ITournament } from "../../core/Entities/ITournament";
import { TournamentActions, TournamentActionsTypes } from "./tournaments.actions";



import * as fromRoot from "../../root/state/app.state"

export interface State extends fromRoot.State{
    tournaments:TournamentsState
}


export interface TournamentsState{
    tournaments:ITournament[],
    loadFailiureMessage:string,
    selectedTournamentId:string,
    creatingTournamentState:boolean,
    creatingTournamentFailedMessage:string
}

const initialState:TournamentsState={
    tournaments:null,
    loadFailiureMessage:null,
    selectedTournamentId:null,
    creatingTournamentState:false,
    creatingTournamentFailedMessage:null
}


// Selectors
const getTournamentFutureState=createFeatureSelector<TournamentsState>("tournaments");

export const getTournaments=createSelector(
    getTournamentFutureState,
    state=>state.tournaments
)
export const getLoadFailiureMessage=createSelector(
    getTournamentFutureState,
    state=>state.loadFailiureMessage
)

export const getSelectedTournamentId=createSelector(
    getTournamentFutureState,
    state=>state.selectedTournamentId
)
export const getSelectedTournament=createSelector(
    getTournamentFutureState,
    getSelectedTournamentId,
    (state,selectedTournamentId)=>
    state.tournaments?state.tournaments.find(tournament=>tournament.id==selectedTournamentId):null
)




export function reducer(state=initialState,action:TournamentActions):TournamentsState{
        switch (action.type) {
            case TournamentActionsTypes.LoadSuccess: 
                return {
                    ...state,
                    tournaments:action.payload,
                    loadFailiureMessage:null,
                    selectedTournamentId:null
                }
            case TournamentActionsTypes.LoadFailiure: 
                return {
                    ...state,
                    tournaments:null,
                    loadFailiureMessage:action.payload,
                    selectedTournamentId:null
                }
            case TournamentActionsTypes.SetSelectedTournamentId: 
                return {
                    ...state,
                    selectedTournamentId:action.payload
                }
            case TournamentActionsTypes.LoadSelectedTournamentSuccess:
                if(state.tournaments==null || state.tournaments.length==0){
                    //set current tournament has all the data
                    var payload={
                        ...action.payload,
                        allTheData:true
                    }
                    return {
                        ...state,
                        loadFailiureMessage:null,
                        tournaments:[payload]
                    }
                } 
                return {
                    ...state,
                    loadFailiureMessage:null,
                    tournaments:state.tournaments.map(tournament=>
                            tournament.id==action.payload.id?action.payload:tournament
                        )
                }
            case TournamentActionsTypes.LoadSelectedTournamentFailiure: 
                return {
                    ...state,
                    selectedTournamentId:null,
                    loadFailiureMessage:action.payload,
                }
            case TournamentActionsTypes.CreateTournament: 
                return {
                    ...state,
                    creatingTournamentState:true,
                }
            case TournamentActionsTypes.CreateTournamentSuccess: 
                return {
                    ...state,
                    creatingTournamentState:false,
                    tournaments:[...state.tournaments,action.payload]
                }
            case TournamentActionsTypes.CreateTournamentFailiure: 
                return {
                    ...state,
                    creatingTournamentState:false,
                    creatingTournamentFailedMessage:action.payload
                }
            default:
                return state;
        }
}