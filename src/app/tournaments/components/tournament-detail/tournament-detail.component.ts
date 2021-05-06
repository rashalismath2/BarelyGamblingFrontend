import { HttpErrorResponse } from '@angular/common/http';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITournament } from 'src/app/Entities/ITournament';
import { TournamentsService } from '../../services/tournaments.service';


@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.scss']
})
export class TournamentDetailComponent implements OnInit {

  constructor(private route:ActivatedRoute,private _tournamentService:TournamentsService) { }

  @Input() _tournament:ITournament;
 

  ngOnInit(): void {

  }


}
