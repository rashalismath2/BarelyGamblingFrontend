import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
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

}
