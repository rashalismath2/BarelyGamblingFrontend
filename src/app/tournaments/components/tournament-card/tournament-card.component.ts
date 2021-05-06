
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ITournament } from 'src/app/Entities/ITournament';


@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.scss']
})
export class TournamentCardComponent implements OnInit {

  @Input() _tournament:ITournament;
  @Output() selectedTournament:EventEmitter<ITournament>=new EventEmitter<ITournament>()

  
  ngOnInit(): void {

  }
  getSelectedTournament(tournament){
    this.selectedTournament.emit(tournament)
  }
}
