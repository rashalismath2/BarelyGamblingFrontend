import { ITournament } from "src/app/root/Entities/ITournament";

export interface TournamentsResolved {
    tournaments:ITournament[],
    error?:string
}
