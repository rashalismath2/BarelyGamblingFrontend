import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import 'rxjs/add/operator/do';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
  constructor(private router:Router) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      return next.handle(req).do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
        }
      },(err: any) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
            // this.router.navigate(["login"],{queryParams:{message:"Please login in order to complete the operation"}});
        }
      });
  }
}  

@Injectable()
export class TokenIntercepterService implements HttpInterceptor{
  _token:string;

  constructor(private injector: Injector,private _authService:AuthenticationService) {
      this._token=_authService.getJWTToken()
  }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${this._token}`,
          'Content-Type': 'application/json'
        }
      });
      return next.handle(req);
    
  }

}

