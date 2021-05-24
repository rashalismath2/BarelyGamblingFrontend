import { PlayerType } from "./Enums/PlayerType";
import { ITeamMember } from "./ITeamMember";
import { IUser } from "./IUser";

export class TeamMember implements ITeamMember{
    id: string;
    user: IUser;
    playerType: PlayerType;
    userId:string
}