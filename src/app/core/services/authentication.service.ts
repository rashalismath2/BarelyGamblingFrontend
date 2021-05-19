import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Injectable} from "@angular/core"
import { Observable } from "rxjs";
import { ISignInInput } from "../Entities/ISignInInput";
import { ILoginDto } from "../Entities/ILoginDto";
import { environment } from "src/environments/environment";
import * as fromAuth from '../state/reducer';
import { filter, map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { ISignUpInput } from "../Entities/ISignupInput";
import { IUser } from "../Entities/IUser";



@Injectable({
  providedIn:"root"
})
export class AuthenticationService{

    private signInUrl=environment.apiUrl+"/auth/login"
    private signUpUrl=environment.apiUrl+"/auth/register"

    constructor(private http:HttpClient,private _authenticactionStore: Store<fromAuth.CoreState>) {

    }


    getJWTToken():string{
      return  JSON.parse(localStorage.getItem('auth_user'))
      ?JSON.parse(localStorage.getItem('auth_user')).token
      :null
    }
    
    userIsAuthenticated():boolean{
      return  JSON.parse(localStorage.getItem('auth_user'))
      ?true
      :false
    }

    getAuthUser():Observable<ILoginDto>{
      return this._authenticactionStore.select(fromAuth.getAuthUser).pipe(
        filter(auth=>auth!=null)
      )
    }
    
      
    signIn(user:ISignInInput):Observable<ILoginDto>{
        return this.http.post<ILoginDto>(this.signInUrl, user)
    }


    signUp(formInputs:ISignUpInput):Observable<IUser>{
        const httpOptions = {
            headers: new HttpHeaders({
              "Accept":  'application/json',
              "Content-Type": "multipart/form-data"
            })
          };

          var formData = new FormData();
          formData.append("Email", formInputs.email);
          formData.append("Password", formInputs.password);
          formData.append("FirstName", formInputs.firstName);
          formData.append("LastName", formInputs.lastName);
          formData.append("ProfilePicture", formInputs.profilePicture);
     
        return this.http.post<IUser>(this.signUpUrl, formData)
    }
}