import { IBidding } from "./IBidding";
import { ITeam } from "./ITeam";
import { ITeamMember } from "./ITeamMember";

export class Team implements ITeam{
    id: string;
    title: string;
    description: string;
    total: number;
    biddingRestrictedTos: number;
    won: boolean;
    teamMembers: ITeamMember[];
    biddings: IBidding[];
}