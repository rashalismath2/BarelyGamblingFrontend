import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../Entities/IUser';
import { UpdateUserDto } from '../Entities/UpdateUserDto';
import { User } from '../Entities/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _url:string=environment.apiUrl+"/users"
  private _updateUserUrl:string=environment.apiUrl+"/auth/"

  constructor(private http:HttpClient) { }

  getUsersByEmail(email:string):Observable<User[]>{
    return this.http.get<User[]>(this._url+"?email="+email)
    .pipe(
      catchError(this.handleError)
    )
  }

  updateUser(user:UpdateUserDto):Observable<IUser>{
    var formData = new FormData();
    formData.append("FirstName", user.FirstName);
    formData.append("LastName", user.LastName);
    formData.append("OldPassword", user.OldPassword);
    formData.append("NewPassword", user.NewPassword);
    formData.append("ProfilePicture", user.ProfilePicture);
    formData.append("profilePictureChangeRequest", user.profilePictureChangeRequest.toString());
    formData.append("passwordChangeRequest", user.passwordChangeRequest.toString());

    return this.http.put<IUser>(this._updateUserUrl+user.UserId,formData)
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
    else if(error.status==401){
      errorMessage="You have to be signed in to proceed with this action"
    }
    else if(error.status==400){
      errorMessage=errorMessage+"Check for errors in "
      for (const key in error.error) {
        errorMessage=errorMessage+key+" "
      }
      errorMessage=errorMessage+" Field(s)"
    }
    else{
      errorMessage=error.error
    }
    console.log(errorMessage)
    return throwError(errorMessage);
  }
}
