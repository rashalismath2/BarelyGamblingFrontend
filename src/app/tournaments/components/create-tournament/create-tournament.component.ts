import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup,FormArray} from '@angular/forms';
import {  select, Store } from '@ngrx/store';
import { Tournament } from 'src/app/core/Entities/Tournament';
import * as fromTournamentActions from "../../state/tournaments.actions"

import * as fromTournamentReducer from "../../state/reducer"
import { Team } from 'src/app/core/Entities/Team';
import { TeamMember } from 'src/app/core/Entities/TeamMember';
import { User } from 'src/app/core/Entities/User';
import { UsersService } from 'src/app/core/services/users.service';

import * as fromCoreState from "../../../core/state/reducer"
import { SearchedUser } from 'src/app/core/Entities/SearchedUser';
import * as fromCoreActions from "../../../core/state/core.actions"
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/Entities/IUser';
import { takeWhile } from 'rxjs/operators';


@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.scss']
})
export class CreateTournamentComponent implements OnInit, OnDestroy {

  newTournamentForm:FormGroup
  searchedUsers$:Observable<IUser[]>
  searchedUsersElementId:string
  searchedUsersForTeamTwoElementId:string
  componentActive:boolean

  constructor(
    private formBuilder:FormBuilder,
    private tournamentState:Store<fromTournamentReducer.TournamentsState>,
    private userService:UsersService,
    private coreStore:Store<fromCoreState.State>
    ) { 

    }
  ngOnDestroy(): void {
    this.componentActive=false
  }

  ngOnInit(): void {
    this.componentActive=true
    
    this.newTournamentForm=this.formBuilder.group({
      title:"",
      vanue:"",
      price:"",
      description:"",
      date:"",
      teamOneTitle:"--",
      teamOneDescription:"",
      teamOneMembers:this.formBuilder.array([
        this.createTeamOneMember()
      ]),
  
      teamTwoTitle:"--",
      teamTwoDescription:"",
      teamTwoMembers:this.formBuilder.array([
        this.createTeamOneMember()
      ]),
    })
 
   this.searchedUsers$=this.coreStore.pipe(select(fromCoreState.getSearchedUsers))

   this.coreStore.pipe(
     select(fromCoreState.getSearchedUsersElementId),
      takeWhile(()=>this.componentActive)
    )
    .subscribe((id)=>this.searchedUsersElementId=id)

   this.coreStore.pipe(
     select(fromCoreState.searchedUsersForTeamTwoElementId),
      takeWhile(()=>this.componentActive)
    )
    .subscribe((id)=>this.searchedUsersForTeamTwoElementId=id)

  }

  get teamOneMembers():FormArray{
    return this.newTournamentForm.get("teamOneMembers") as FormArray
  }

  get teamTwoMembers():FormArray{
    return this.newTournamentForm.get("teamTwoMembers") as FormArray
  }

  userAtTeamOneIndex(index){
    return this.teamOneMembers.at(index).get("user")
  }
  userAtTeamTwoIndex(index){
    return this.teamTwoMembers.at(index).get("user")
  }

  createTeamOneMember(): FormGroup {
    return this.formBuilder.group({
      type:'',
      userId:'',
      user:''
    });
  }
  addTeamOneMember(){
    this.teamOneMembers.push(this.createTeamOneMember())
  }
  addTeamTwoMember(){
    this.teamTwoMembers.push(this.createTeamOneMember())
  }

  setSelectedMemberForTeamOne(user,groupIndex){
    this.teamOneMembers.at(groupIndex).patchValue({
      user:user,
      userId:user.id
    })
    this.tournamentState.dispatch(new fromCoreActions.LoadUserByEmailFailure(""))
  }

  setSelectedMemberForTeamTwo(user,groupIndex){
    this.teamTwoMembers.at(groupIndex).patchValue({
      user:user,
      userId:user.id
    })
    this.tournamentState.dispatch(new fromCoreActions.LoadUserByEmailFailure(""))
  }

  removeSelectedUserForTeamOne(groupIndex){
    this.teamOneMembers.at(groupIndex).patchValue({
      userId:'',
      user:''
    })
  }
  removeSelectedUserForTeamTwo(groupIndex){
    this.teamTwoMembers.at(groupIndex).patchValue({
      userId:'',
      user:''
    })
  }

  onSubmit(form:FormGroup){
    
    var tournament=new Tournament();
    tournament.title=form.get("title").value
    tournament.description=form.get("description").value
    tournament.place=form.get("vanue").value
    tournament.startingDate=form.get("date").value
    tournament.tournamentPrize=form.get("price").value
    tournament.teams=[this.getTeamOne(form),this.getTeamTwo(form)]

    this.tournamentState.dispatch(new fromTournamentActions.CreateTournament(tournament))
  }

  getTeamOne(form:FormGroup):Team{
    var teamOne=new Team();
    teamOne.title=form.get("teamOneTitle").value
    teamOne.description=form.get("teamOneDescription").value

    teamOne.teamMembers=this.teamOneMembers.controls.map(member=>{
        var teamOneMember=new TeamMember();

        teamOneMember.playerType=member.get("type").value
        teamOneMember.userId=member.get("userId").value
      return teamOneMember;
    })

    return teamOne
  }



  getTeamTwo(form:FormGroup):Team{
    var teamTwo=new Team();
    teamTwo.title=form.get("teamTwoTitle").value
    teamTwo.description=form.get("teamTwoDescription").value

    teamTwo.teamMembers=this.teamTwoMembers.controls.map(member=>{
        var teamOneMember=new TeamMember();
        teamOneMember.playerType=member.get("type").value
 
        teamOneMember.userId=member.get("userId").value
      return teamOneMember;
    })
    return teamTwo
  }


  teamOneMemberChange(input){
    var elementId=input.srcElement["data-member-field"]
    var searchedUser=new SearchedUser();
    searchedUser.element=elementId
    searchedUser.email=input.target.value
    searchedUser.searchingForElement="one"
    
    this.coreStore.dispatch(new fromCoreActions.LoadUserByEmail(searchedUser))
  }

  teamTwoMemberChange(input){
    var elementId=input.srcElement["data-member-field"]
    var searchedUser=new SearchedUser();
    searchedUser.elementForTeamTwo=elementId
    searchedUser.email=input.target.value
    searchedUser.searchingForElement="two"
    
    this.coreStore.dispatch(new fromCoreActions.LoadUserByEmail(searchedUser))
  }

}
