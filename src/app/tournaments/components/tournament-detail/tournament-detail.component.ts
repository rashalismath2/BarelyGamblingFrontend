import { HttpErrorResponse } from '@angular/common/http';
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

  _tournament:ITournament=null;
  _errorMessage:string=null;
  _fetchingTournamentComplete=false;

  ngOnInit(): void {
    this._tournamentService
        .GetTournamentById(this.route.snapshot.paramMap.get("id"))
        .pipe(
          catchError(this.HandleRetrievingTournamentError)
        )
        .subscribe(
          {
            next:tournament=>this._tournament=tournament,
            error:error=>this._errorMessage=error,
            complete:()=>{
                this._fetchingTournamentComplete=true
            }
          }
        )
  }
  HandleRetrievingTournamentError(error:HttpErrorResponse) {
    if(error.error instanceof ErrorEvent){
      this._errorMessage=error.error.message
    }
    else{
      this._errorMessage="Something went wrong"
    }

    return throwError
  }

}
