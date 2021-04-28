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


  GetTournaments():Observable<ITournament[]>{
    return  this.http.get<ITournament[]>(this._uri,{
      headers:{
        'accept':"application/json"
      }
    });
  
  }

  _uri:string=environment.apiUrl+"/tournaments"

}
