import { IBidding } from "./IBidding";
import { ITeamMember } from "./ITeamMember";


export interface ITeam{
    id:string;
    title:string;
    description:string;
    total:number;
    biddingRestrictedTos:number;
    won:boolean;
    teamMembers:ITeamMember[];
    biddings:IBidding[];
}