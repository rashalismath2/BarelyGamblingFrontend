import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITournament } from '../../root/Entities/ITournament';
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
  
  private handleError(error:HttpErrorResponse) {
    let errorMessage=""
    console.log(error)
    if(error.error instanceof ErrorEvent){
      errorMessage=error.error.message
    }
    else{
      errorMessage="Unhandled exception"
    }

    return throwError(errorMessage);
  }
}

