import { Action } from "@ngrx/store";
import { IUser } from "src/app/core/Entities/IUser";
import { ITournament } from "../../core/Entities/ITournament";


export enum TournamentActionsTypes{
    Load="[tournaments] LoadTournaments",
    LoadSuccess="[tournaments] LoadSuccessTournaments",
    LoadFailiure="[tournaments] LoadFailiureTournaments",
    SetSelectedTournamentId="[tounaments] SetSelectedTournamentId",
    LoadSelectedTournament="[tournaments] LoadSelectedTournament",
    LoadSelectedTournamentSuccess="[tournaments] LoadSelectedTournamentSuccess",
    LoadSelectedTournamentFailiure="[tournaments] LoadSelectedTournamentFailiure",

    CreateTournament="[tournaments] CreateTournament",
    CreateTournamentSuccess="[tournaments] CreateTournamentSuccess",
    CreateTournamentFailiure="[tournaments] CreateTournamentFailiure",

    UpdateTournament="[tournaments] UpdateTournament",
    UpdateTournamentSuccess="[tournaments] UpdateTournamentSuccess",
    UpdateTournamentFailiure="[tournaments] UpdateTournamentFailiure",
    
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

export class CreateTournament implements Action{
    readonly type=TournamentActionsTypes.CreateTournament;
    constructor(public payload:ITournament){}
}
export class CreateTournamentSuccess implements Action{
    readonly type=TournamentActionsTypes.CreateTournamentSuccess;
    constructor(public payload:ITournament){}
}
export class CreateTournamentFailiure implements Action{
    readonly type=TournamentActionsTypes.CreateTournamentFailiure;
    constructor(public payload:string){}
}


export class UpdateTournament implements Action{
    readonly type=TournamentActionsTypes.UpdateTournament;
    constructor(public payload:ITournament){}
}
export class UpdateTournamentSuccess implements Action{
    readonly type=TournamentActionsTypes.UpdateTournamentSuccess;
    constructor(public payload:ITournament){}
}
export class UpdateTournamentFailiure implements Action{
    readonly type=TournamentActionsTypes.UpdateTournamentFailiure;
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
                            | LoadSelectedTournamentFailiure
                            |CreateTournament
                            |CreateTournamentSuccess
                            |CreateTournamentFailiure
                            |UpdateTournament
                            |UpdateTournamentSuccess
                            |UpdateTournamentFailiure
           