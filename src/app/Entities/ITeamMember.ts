import { PlayerType } from "./Enums/PlayerType";
import { IUser } from "./IUser";

export interface ITeamMember{
    id:string;
    user:IUser;
    playerType:PlayerType;
}