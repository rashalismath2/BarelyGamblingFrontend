import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ILoginDto } from '../../../core/Entities/ILoginDto';
import { ITournament } from '../../../core/Entities/ITournament';
import * as fromTournamentReducer from '../../state/reducer';

import * as fromAuth from '../../../core/state/reducer';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import * as fromTournamentActions from "../../state/tournaments.actions"

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.scss']
})
export class TournamentDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private _authenticactionStore: Store<fromAuth.CoreState>,
    private _tournamentStore: Store<fromTournamentReducer.TournamentsState>,
    private _snackBar: MatSnackBar,
  ) { }

  _tournament: ITournament;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  _authUser$: Observable<ILoginDto>

  ngOnInit(): void {

    this._authUser$ = this._authenticactionStore
      .pipe(
        select(fromAuth.getAuthUser)
      )

    this.route.queryParams.subscribe(params=>{
      if(params.tournament_operation){
        this.openSnackBar(params.tournament_operation)
      }
    })
    

    var resolvedData =this.route.parent.snapshot.data["tournament"]
    if(resolvedData.error)  this.openSnackBar("Error in loading tournaments")
    if(resolvedData.tournament){
      this._tournament=resolvedData.tournament
      this._tournamentStore.dispatch(new fromTournamentActions.LoadSelectedTournamentSuccess(resolvedData.tournament))
    }
  }

  openSnackBar(message:string){
    this._snackBar.open(message, "Close",{
      duration: 3 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }


}
