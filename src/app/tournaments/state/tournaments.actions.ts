import { Action } from "@ngrx/store";
import { ITournament } from "src/app/Entities/ITournament";


export enum TournamentActionsTypes{
    Load="[tournaments] LoadTournaments",
    LoadSuccess="[tournaments] LoadSuccessTournaments",
    LoadFailiure="[tournaments] LoadFailiureTournaments",
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

export type TournamentActions=LoadTournaments|LoadSuccess|LoadFailiure