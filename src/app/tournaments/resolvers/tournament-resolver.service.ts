import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ITournament } from 'src/app/core/Entities/ITournament';
import { TournamentsService } from '../services/tournaments.service';

import * as fromTournamentReducer from '../state/reducer';
import { LoadSelectedTournament, SetSelectedTournamentId } from '../state/tournaments.actions';
import { TournamentResolved } from './TournamentResolved';

@Injectable({
  providedIn: 'root'
})
export class TournamentResolverService implements Resolve<TournamentResolved>{

  constructor(
    private _tournamentService:TournamentsService,
    private tournamentStore: Store<fromTournamentReducer.TournamentsState>,
    ) { }
    
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TournamentResolved>  {
    const id=route.paramMap.get("id");
    return this._tournamentService.GetTournamentById(id)
          .pipe(
            map(tournament=>({tournament:tournament,error:null})),
            catchError(error=>of({tournament:null,error:error}))
          )
  
  }
}
