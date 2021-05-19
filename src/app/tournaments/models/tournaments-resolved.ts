import { ITournament } from "src/app/core/Entities/ITournament";

export interface TournamentsResolved {
    tournaments:ITournament[],
    error?:string
}
