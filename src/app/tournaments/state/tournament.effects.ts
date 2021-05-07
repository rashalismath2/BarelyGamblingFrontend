import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';
import { ITournament } from 'src/app/Entities/ITournament';
import { TournamentsService } from '../services/tournaments.service';

import * as fromTournamentActions from './tournaments.actions';



@Injectable()
export class TournamentEffects {

  constructor(private actions$: Actions,private tournamentService:TournamentsService) {}


  @Effect()
  loadTournaments$=this.actions$.pipe(
    ofType(fromTournamentActions.TournamentActionsTypes.Load),
    mergeMap((action:fromTournamentActions.LoadTournaments)=>
      this.tournamentService.retrieveAllTournaments().pipe(
        map((tournaments:ITournament[])=>(new fromTournamentActions.LoadSuccess(tournaments)))
      )
    )
  )
  @Effect()
  loadSelectedTournament$=this.actions$.pipe(
    ofType(fromTournamentActions.TournamentActionsTypes.LoadSelectedTournament),
    map((action:fromTournamentActions.LoadSelectedTournament)=>action.payload),
    mergeMap((tournamentId:string)=>
      this.tournamentService.GetTournamentById(tournamentId).pipe(
        tap(data=>console.log(data)),
        map((tournament:ITournament)=>(new fromTournamentActions.LoadSelectedTournamentSuccess(tournament))),
        catchError(err=>of(new fromTournamentActions.LoadSelectedTournamentFailiure(err)))
      )
    )
  )


}
