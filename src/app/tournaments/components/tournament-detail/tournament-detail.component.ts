import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ILoginDto } from '../../../core/Entities/ILoginDto';
import { ITournament } from '../../../core/Entities/ITournament';
import * as fromTournamentReducer from '../../state/reducer';
import { LoadSelectedTournament, SetSelectedTournamentId } from '../../state/tournaments.actions';

import * as fromAuth from '../../../core/state/reducer';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.scss']
})
export class TournamentDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private tournamentStore: Store<fromTournamentReducer.TournamentsState>,
    private _authenticactionStore: Store<fromAuth.CoreState>,
    private _snackBar: MatSnackBar,
  ) { }

  _tournament$: Observable<ITournament>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  _authUser$: Observable<ILoginDto>

  ngOnInit(): void {

    this._authUser$ = this._authenticactionStore
      .pipe(
        select(fromAuth.getAuthUser)
      )

    this.route.queryParams.subscribe(params=>{
      if(params.tournament_created){
        this.openSnackBar(params.signupSuccess)
      }
    })
    
    this.tournamentStore.dispatch(new SetSelectedTournamentId(this.route.snapshot.paramMap.get("id")))
    this.tournamentStore.dispatch(new LoadSelectedTournament(this.route.snapshot.paramMap.get("id")))

    this._tournament$ = this.tournamentStore.pipe(
      select(fromTournamentReducer.getSelectedTournament)
    )
    
  }

  openSnackBar(message:string){
    this._snackBar.open(message, "Close",{
      duration: 3 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }


}
