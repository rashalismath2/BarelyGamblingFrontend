import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Injectable} from "@angular/core"
import { Observable } from "rxjs";
import { IAuth } from "src/app/Entities/IAuth";
import { ISignIn } from "src/app/Entities/ISignIn";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{

    private signInUrl=environment.apiUrl+"/auth/login"

    constructor(private http:HttpClient) {

    }
    
      
    signIn(user:IAuth):Observable<ISignIn>{
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              "Accept":  'application/json'
            })
          };
     
        return this.http.post<ISignIn>(this.signInUrl, user, httpOptions)
    }
}