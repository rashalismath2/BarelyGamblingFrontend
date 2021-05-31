import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormArray} from '@angular/forms';
import {  select, Store } from '@ngrx/store';
import { Tournament } from 'src/app/core/Entities/Tournament';
import * as fromTournamentActions from "../../state/tournaments.actions"

import * as fromTournamentReducer from "../../state/reducer"
import { Team } from 'src/app/core/Entities/Team';
import { TeamMember } from 'src/app/core/Entities/TeamMember';

import * as fromCoreState from "../../../core/state/reducer"
import { SearchedUser } from 'src/app/core/Entities/SearchedUser';
import * as fromCoreActions from "../../../core/state/core.actions"
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/Entities/IUser';
import { takeWhile } from 'rxjs/operators';
import { ActivatedRoute,Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { ITournament } from 'src/app/core/Entities/ITournament';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ITeamMember } from 'src/app/core/Entities/ITeamMember';
import { CanComponentDeactivate } from '../../../core/guards/form-dirty.guard';


@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.scss']
})
export class CreateTournamentComponent implements OnInit, OnDestroy,CanComponentDeactivate {

  newTournamentForm:FormGroup
  searchedUsers$:Observable<IUser[]>
  searchedUsersElementId:string
  searchedUsersForTeamTwoElementId:string
  componentActive:boolean
  spinner:boolean=false
  submitted: boolean=false

  _tournament:ITournament
  _operationButtonString:string="Create"

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
 
  
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private formBuilder:FormBuilder,
    private tournamentState:Store<fromTournamentReducer.TournamentsState>,
    private _snackBar: MatSnackBar,
    private coreStore:Store<fromCoreState.State>
    ) { }

  canDeactivate (){
    if(this.newTournamentForm.dirty && !this.submitted) return window.confirm("You have some unsaved changes")
    return true
  }


  ngOnInit(): void {
    this.componentActive=true

    this.router.events.subscribe((routerEvent:Event)=>{
      this.checkRouterEvent(routerEvent)
    })

    this.getTournamentCreationErrorMessage()
    this.createFormFields()
    this.getTournamentFromResolvedData()

    this.searchUsersForTeamOneElementId()
    this.searchUsersForTeamTwoElementId()

    this.searchedUsers$=this.coreStore.pipe(select(fromCoreState.getSearchedUsers))

  }

  createFormFields() {
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
  }

  
  get teamOneMembers():FormArray{
    return this.newTournamentForm.get("teamOneMembers") as FormArray
  }

  get teamTwoMembers():FormArray{
    return this.newTournamentForm.get("teamTwoMembers") as FormArray
  }

  addTeamOneMember(){
    this.teamOneMembers.push(this.createTeamOneMember())
  }
  addTeamTwoMember(){
    this.teamTwoMembers.push(this.createTeamOneMember())
  }

  removeSelectedUserForTeamOne(groupIndex){
    this.teamOneMembers.removeAt(groupIndex)
  }
  removeSelectedUserForTeamTwo(groupIndex){
    this.teamTwoMembers.removeAt(groupIndex)
  }

  userAtTeamOneIndex(index){
    return this.teamOneMembers.at(index).get("user")
  }
  userAtTeamTwoIndex(index){
    return this.teamTwoMembers.at(index).get("user")
  }


  searchUsersForTeamTwoElementId() {
    this.coreStore.pipe(
      select(fromCoreState.searchedUsersForTeamTwoElementId),
       takeWhile(()=>this.componentActive)
     )
     .subscribe((id)=>this.searchedUsersForTeamTwoElementId=id)
  }
  searchUsersForTeamOneElementId() {
    this.coreStore.pipe(
      select(fromCoreState.getSearchedUsersElementId),
       takeWhile(()=>this.componentActive)
     )
     .subscribe((id)=>this.searchedUsersElementId=id)
  }
    
  getTournamentFromResolvedData() {
    var resolvedData =this.route.parent.snapshot.data["tournament"]
    if(resolvedData!=null){  
      if(resolvedData.error) this.openSnackBar("Error in loading tournaments")
      if(resolvedData.tournament) {
        this._operationButtonString="Edit"
        this._tournament=resolvedData.tournament
        this.populateFormWithTournamentData(this._tournament);
      }
    }
  }

  populateFormWithTournamentData(tournament:ITournament){
    console.log(tournament)
    this.newTournamentForm.patchValue({
      title:tournament.title,
      vanue:tournament.place,
      price:tournament.tournamentPrize,
      description:tournament.description,
      date:tournament.startingDate,
      teamOneTitle:tournament.teams[0].title,
      teamOneDescription:tournament.teams[0].description,
      teamTwoTitle:tournament.teams[1].title,
      teamTwoDescription:tournament.teams[1].description,
    })

    this.newTournamentForm.setControl(
          "teamOneMembers",
          this.populateTeamOneMembers(tournament.teams[0].teamMembers)
    )
    this.newTournamentForm.setControl(
      "teamTwoMembers",
      this.populateTeamTwoMembers(tournament.teams[1].teamMembers)
    )
  }

  populateTeamOneMembers(members:ITeamMember[]):FormArray{
    var array=new FormArray([]);
    members.forEach(member=>{
      array.push(this.formBuilder.group({
        type:member.playerType,
        userId:member.user.id,
        user:member.user
      }))
    })
    return array;
  }

  populateTeamTwoMembers(members:ITeamMember[]):FormArray{
    var array=new FormArray([]);
    members.forEach(member=>{
      array.push(this.formBuilder.group({
        type:member.playerType,
        userId:member.user.id,
        user:member.user
      }))
    })
    return array;
  }


  createTeamOneMember(): FormGroup {
    return this.formBuilder.group({
      type:'',
      userId:'',
      user:''
    });
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


  onSubmit(form:FormGroup){
    
    var tournament=new Tournament();
    tournament.title=form.get("title").value
    tournament.description=form.get("description").value
    tournament.place=form.get("vanue").value
    tournament.startingDate=form.get("date").value
    tournament.tournamentPrize=form.get("price").value
    tournament.teams=[this.getTeamOne(form),this.getTeamTwo(form)]

    this.spinner=true
    this.submitted=true

    if(this._operationButtonString=="Edit"){ 
      tournament.id=this._tournament.id
      this.tournamentState.dispatch(new fromTournamentActions.UpdateTournament(tournament))
     }
    else this.tournamentState.dispatch(new fromTournamentActions.CreateTournament(tournament))
  }

  getTournamentCreationErrorMessage() {
    this.tournamentState.select(fromTournamentReducer.getTournamentCreationFailiureMessage)
    .pipe(
      takeWhile(()=>this.componentActive)
    )
    .subscribe(message=>{
      if(message!=null) {
        this.spinner=false
        this.submitted=false
        this.openSnackBar(message)
      }
    })
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

  openSnackBar(message:string){
    this._snackBar.open(message, "Close",{
      duration: 3 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  checkRouterEvent(routerEvent: Event) {
    if(routerEvent instanceof NavigationStart) this.spinner=true

    var events= routerEvent instanceof NavigationEnd
              ||  routerEvent instanceof NavigationCancel
              ||  routerEvent instanceof NavigationError

    if(events) this.spinner=false
}

  ngOnDestroy(): void {
    this.componentActive=false
  }


}

