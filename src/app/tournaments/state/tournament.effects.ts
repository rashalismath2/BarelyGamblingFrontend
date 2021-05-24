import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, switchMapTo, tap } from 'rxjs/operators';
import { ITournament } from '../../core/Entities/ITournament';
import { TournamentsService } from '../services/tournaments.service';

import * as fromTournamentActions from './tournaments.actions';
import * as fromTournamentReducer from "../state/reducer"
import { Action, Store } from '@ngrx/store';
import { Router } from '@angular/router';


@Injectable()
export class TournamentEffects {

  constructor(private actions$: Actions,
    private tournamentService:TournamentsService,
    private store:Store<fromTournamentReducer.State>,
    private router:Router
    ) 
    {

    }


  @Effect()
  loadTournaments$=this.actions$.pipe(
    ofType(fromTournamentActions.TournamentActionsTypes.Load),
    switchMapTo(this.store.select(fromTournamentReducer.getTournaments)),
    filter(tournaments => tournaments === null),
    switchMap(()=>
      this.tournamentService.retrieveAllTournaments().pipe(
        map((tournaments:ITournament[])=>(new fromTournamentActions.LoadSuccess(tournaments))),
        catchError(err=>of(new fromTournamentActions.LoadSelectedTournamentFailiure(err)))
      )
    )
  )
  @Effect()
  loadSelectedTournament$=this.actions$.pipe(
    ofType(fromTournamentActions.TournamentActionsTypes.LoadSelectedTournament),
    map((action:fromTournamentActions.LoadSelectedTournament)=>action.payload),
    mergeMap((tournamentId:string)=>
      this.tournamentService.GetTournamentById(tournamentId).pipe(
        map((tournament:ITournament)=>(new fromTournamentActions.LoadSelectedTournamentSuccess(tournament))),
        catchError(err=>of(new fromTournamentActions.LoadSelectedTournamentFailiure(err)))
      )
    )
  )

  @Effect()
  createTournament$=this.actions$.pipe(
    ofType(fromTournamentActions.TournamentActionsTypes.CreateTournament),
    map((action:fromTournamentActions.CreateTournament)=>action.payload),
    switchMap((tournament:ITournament)=>
      this.tournamentService.createTournament(tournament).pipe(
        map((tournament:ITournament)=>(new fromTournamentActions.CreateTournamentSuccess(tournament))),
        catchError(err=>of(new fromTournamentActions.CreateTournamentFailiure(err)))
      )
    )
  )

  @Effect({ dispatch: false })
  tournamentCreatedSuccessfully$=this.actions$.pipe(
      ofType(fromTournamentActions.TournamentActionsTypes.CreateTournamentSuccess),
      map((action:fromTournamentActions.CreateTournamentSuccess)=>action.payload),
      tap((tournament:ITournament)=>{
          this.router.navigate(["tournaments",tournament.id],{queryParams:{tournament_created:"Tournament was created."}});
      }),
  )




}
