import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { TournamentsResolved } from '../models/tournaments-resolved';
import { TournamentsService } from './tournaments.service';
import * as fromTournamentReducer from "../state/reducer"
import * as fromTournamentActions from "../state/tournaments.actions"
import { catchError, map, take } from 'rxjs/operators';

@Injectable()
export class TournamentsResolverService implements Resolve<TournamentsResolved> {

  constructor(
    private _tournamentService:TournamentsService,
    private tournamentStore:Store<fromTournamentReducer.State>
  ) {
   
   }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any> 
  {
    this.tournamentStore.dispatch(new fromTournamentActions.LoadTournaments())
    return null;
  }


}
