import { ITeam } from "./ITeam";
import { ITournament } from "./ITournament";
import { IUser } from "./IUser";

export class Tournament implements ITournament{
    id: string;
    title: string;
    description: string;
    place: string;
    startingDate: Date;
    createdAt: Date;
    tournamentPrize: number;
    teams: ITeam[];
    user: IUser;
    hasEnded: boolean;
    hasStarted: boolean;
    allTheData: boolean;
}