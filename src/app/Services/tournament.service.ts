import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITournament } from '../Entities/ITournament';

@Injectable({
  providedIn: 'root'
})
export class TournamentService{

  constructor(private http:HttpClient) { }

  _uri:string=environment.apiUrl+"/tournaments"

  GetAllTournaments():Observable<ITournament[]>{
    return  this.http.get<ITournament[]>(this._uri,{
      headers:{
        'accept':"application/json"
      }
    });
  }

  GetTournamentById(tournamentId:string):Observable<ITournament>{
    let fullUri=this._uri+"/"+tournamentId
    return this.http.get<ITournament>(fullUri,{
      headers:{
        'accept':"application/json"
      }
    });
  }


}
