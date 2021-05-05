import { Component, Input } from '@angular/core';
import { ITeam } from 'src/app/Entities/ITeam';

@Component({
  selector: 'app-tournament-banner',
  templateUrl: './tournament-banner.component.html',
  styleUrls: ['./tournament-banner.component.scss']
})
export class TournamentBannerComponent{

  constructor() { }

  @Input() teams:ITeam[]


}
