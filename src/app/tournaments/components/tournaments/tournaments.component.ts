import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
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

  constructor(private tournamentStore:Store<fromTournamentReducer.State>) { 
  }

  ngOnInit(): void {
    this.componentActive=true
    this._fetchingTournamentsComplete=false

    
    this.tournamentStore
    .pipe(select(fromTournamentReducer.getTournaments),
      takeWhile(()=>this.componentActive))
    .subscribe({
      next:(tournaments:ITournament[])=>this._tournaments=tournaments,
      complete:()=>{
        this._fetchingTournamentsComplete=true 
      }
    })

  }

  ngOnDestroy(): void {
    this.componentActive=false
  }

}



