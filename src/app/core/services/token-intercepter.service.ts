import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/do';
import { AuthenticationService } from './authentication.service';


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
           console.error("get refresh token here")
        }
      });
  }
}  

@Injectable()
export class TokenIntercepterService implements HttpInterceptor{
  constructor(private injector: Injector,private _authService:AuthenticationService) {
      
  }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var token=this._authService.getJWTToken()
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
      return next.handle(req);
    
  }

}