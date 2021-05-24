import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../Entities/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _url:string=environment.apiUrl+"/users"

  constructor(private http:HttpClient) { }

  getUsersByEmail(email:string):Observable<User[]>{
    return this.http.get<User[]>(this._url+"?email="+email)
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
      errorMessage="An error occured in getting user by email. Please try again"
    }

    return throwError(errorMessage);
  }
}
