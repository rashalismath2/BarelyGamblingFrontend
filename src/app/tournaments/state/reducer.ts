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
    tournamentOperationState:boolean,
    tournamentOperationFailedMessage:string
}

const initialState:TournamentsState={
    tournaments:null,
    loadFailiureMessage:null,
    selectedTournamentId:null,
    tournamentOperationState:false,
    tournamentOperationFailedMessage:null
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
export const getTournamentCreationFailiureMessage=createSelector(
    getTournamentFutureState,
    state=>state.tournamentOperationFailedMessage
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
                    tournaments:state.tournaments.map(tournament=>{
                        if(tournament.id==action.payload.id){
                            return action.payload
                        }
                        return tournament
                    })
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
                    tournamentOperationState:true,
                }
            case TournamentActionsTypes.CreateTournamentSuccess: 
                return {
                    ...state,
                    tournamentOperationState:false,
                    tournamentOperationFailedMessage:null,
                }
            case TournamentActionsTypes.CreateTournamentFailiure: 
                return {
                    ...state,
                    tournamentOperationState:false,
                    tournamentOperationFailedMessage:action.payload
                }
            case TournamentActionsTypes.UpdateTournament: 
                return {
                    ...state,
                    tournamentOperationState:true,
                    tournamentOperationFailedMessage:null,
                }
            case TournamentActionsTypes.UpdateTournamentSuccess: 
                return {
                    ...state,
                    tournamentOperationState:false
                }
            case TournamentActionsTypes.UpdateTournamentFailiure: 
                return {
                    ...state,
                    tournamentOperationState:false,
                    tournamentOperationFailedMessage:action.payload
                }
            default:
                return state;
        }
}