import { Action } from "@ngrx/store";
import { ITournament } from "../../core/Entities/ITournament";


export enum TournamentActionsTypes{
    Load="[tournaments] LoadTournaments",
    LoadSuccess="[tournaments] LoadSuccessTournaments",
    LoadFailiure="[tournaments] LoadFailiureTournaments",
    SetSelectedTournamentId="[tounaments] SetSelectedTournamentId",
    LoadSelectedTournament="[tournaments] LoadSelectedTournament",
    LoadSelectedTournamentSuccess="[tournaments] LoadSelectedTournamentSuccess",
    LoadSelectedTournamentFailiure="[tournaments] LoadSelectedTournamentFailiure"
}

export class LoadTournaments implements Action{
    readonly type=TournamentActionsTypes.Load;
    constructor(){}
}

export class LoadSuccess implements Action{
    readonly type=TournamentActionsTypes.LoadSuccess;
    constructor(public payload:ITournament[]){}
}
export class LoadFailiure implements Action{
    readonly type=TournamentActionsTypes.LoadFailiure;
    constructor(public payload:string){}
}


export class LoadSelectedTournament implements Action{
    readonly type=TournamentActionsTypes.LoadSelectedTournament;
    constructor(public payload:string){}
}
export class LoadSelectedTournamentSuccess implements Action{
    readonly type=TournamentActionsTypes.LoadSelectedTournamentSuccess;
    constructor(public payload:ITournament){}
}
export class LoadSelectedTournamentFailiure implements Action{
    readonly type=TournamentActionsTypes.LoadSelectedTournamentFailiure;
    constructor(public payload:string){}
}


export class SetSelectedTournamentId implements Action{
    readonly type=TournamentActionsTypes.SetSelectedTournamentId;
    constructor(public payload:string){}
}

export type TournamentActions=LoadTournaments
                            | LoadSuccess
                            | LoadFailiure
                            | SetSelectedTournamentId
                            | LoadSelectedTournament
                            | LoadSelectedTournamentSuccess
                            | LoadSelectedTournamentFailiure;