import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { ITournament } from '../../../core/Entities/ITournament';
import * as fromTournamentReducer from '../../state/reducer';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit,OnDestroy {

  _tournaments:ITournament[]
  _fetchingTournamentsComplete:boolean
  componentActive: boolean;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private route:ActivatedRoute,
    private _snackBar: MatSnackBar,
    private tournamentStore:Store<fromTournamentReducer.State>) 
  { }

  ngOnInit(): void {
    this.componentActive=true
    this._fetchingTournamentsComplete=false

    this.route.queryParams
      .pipe(
        takeWhile(()=>this.componentActive)
      )
      .subscribe((params:Params)=>{
        if(params.loginSuccess || params.logoutSuccess){
          this.openSnackBar(params.loginSuccess || params.logoutSuccess)
        }
    })
    
    this.tournamentStore
    .pipe(select(fromTournamentReducer.getTournaments),
      takeWhile(()=>this.componentActive))
    .subscribe({
      next:(tournaments:ITournament[])=>this._tournaments=tournaments,
      complete:()=>{
        this._fetchingTournamentsComplete=true 
      },
      error:()=>{
      }
    })

    this.tournamentStore
    .pipe(select(fromTournamentReducer.getLoadFailiureMessage),
      takeWhile(()=>this.componentActive))
    .subscribe(error=>{
      this._fetchingTournamentsComplete=true;
      if(error!=null){
        this.openSnackBar(error)
      }
    })

  }

  openSnackBar(message:string){
    this._snackBar.open(message, "Close",{
      duration: 3 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  

  ngOnDestroy(): void {
    this.componentActive=false
  }

}



