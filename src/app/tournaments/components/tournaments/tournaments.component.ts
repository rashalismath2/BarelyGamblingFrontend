import { Input } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { ITournament } from 'src/app/Entities/ITournament';
import * as fromTournamentReducer from '../../state/reducer';
import * as fromTournamentActions from "../../state/tournaments.actions"

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit,OnDestroy {

  _tournaments:ITournament[]
  _fetchingTournamentsComplete:boolean
  componentActive: boolean;

  constructor(private tournamentStore:Store<fromTournamentReducer.State>) { 
    this._tournaments=[]
  }

  ngOnInit(): void {
      this.tournamentStore.dispatch(new fromTournamentActions.LoadTournaments())

      this.tournamentStore
      .pipe(select(fromTournamentReducer.getTournaments),
      takeWhile(()=>this.componentActive))
      .subscribe({
        next:(tournaments:ITournament[])=>this._tournaments=tournaments,
        complete:()=>this._fetchingTournamentsComplete=true
      })

  }

  ngOnDestroy(): void {
    this.componentActive=false
    
  }

}



