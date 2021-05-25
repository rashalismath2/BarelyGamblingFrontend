import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITournament } from '../../core/Entities/ITournament';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TournamentsService {

  private _url:string=environment.apiUrl+"/tournaments"

  constructor(private http:HttpClient) { }

  retrieveAllTournaments():Observable<ITournament[]>{
    return this.http.get<ITournament[]>(this._url)
    .pipe(
      catchError(this.handleError)
    )
  }

  GetTournamentById(id:string):Observable<ITournament>{
    return this.http.get<ITournament>(this._url+`/${id}`)
    .pipe(
      catchError(this.handleError)
    )
  }

  createTournament(tournament:ITournament):Observable<ITournament>{
    return this.http.post<ITournament>(this._url,tournament)
    .pipe(
      catchError(this.handleError)
    )
  }
  updateTournament(tournament:ITournament):Observable<ITournament>{
    return this.http.put<ITournament>(this._url+`/${tournament.id}`,tournament)
    .pipe(
      catchError(this.handleError)
    )
  }
  
  private handleError(error:HttpErrorResponse) {
    console.log(error)
    let errorMessage=""
    if(error.error instanceof ErrorEvent){
      errorMessage=error.error.message
    }
    else if(error.status && error.status==401){
      errorMessage="You have to be signed in to proceed with this action"
    }
    else{
      errorMessage="An error occured. Please try again"
    }

    return throwError(errorMessage);
  }
}

