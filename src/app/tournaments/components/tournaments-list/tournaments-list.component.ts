import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { ITournament } from 'src/app/core/Entities/ITournament';
import * as fromTournamentReducer from '../../state/reducer';


@Component({
  selector: 'app-tournaments-list',
  templateUrl: './tournaments-list.component.html',
  styleUrls: ['./tournaments-list.component.scss']
})
export class TournamentsListComponent implements OnInit,OnDestroy{
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
