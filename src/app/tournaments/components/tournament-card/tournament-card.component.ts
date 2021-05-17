
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ITournament } from '../../../root/Entities/ITournament';


@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.scss']
})
export class TournamentCardComponent implements OnInit {

  @Input() _tournament:ITournament;

  ngOnInit(): void {

  }

}
