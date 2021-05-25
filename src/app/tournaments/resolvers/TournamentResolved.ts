import { ITournament } from "src/app/core/Entities/ITournament";

export interface TournamentResolved{
    tournament:ITournament,
    error?:string
}