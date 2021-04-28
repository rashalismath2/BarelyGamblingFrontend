import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/Services/tournament.service';

import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ITournament } from 'src/app/Entities/ITournament';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  constructor(private _tournamentService:TournamentService) { }

  ngOnInit(): void {
    this._tournamentService.GetTournaments()
              .pipe(
                tap(data=>console.log(data)),
                catchError(this.HandleRetrievingTournamentError)
              )
              .subscribe({
                next:tournaments=>this._tournaments=tournaments,
                error:err=>this._errorMessage=err,
                complete:()=>{
                  this._fetchingTournamentsComplete=true;
                }
              })
              
  }

  _fetchingTournamentsComplete:boolean=false;
  _errorMessage="";
  _tournaments:ITournament[]=[];

  
  private HandleRetrievingTournamentError(err:HttpErrorResponse){

    if(err.error instanceof ErrorEvent){
      this._errorMessage=err.error.message
    }
    else{
      this._errorMessage="An unhandled exception"
    }
    return throwError
  }
}
