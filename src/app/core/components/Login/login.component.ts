import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { Auth } from '../../Entities/Auth';
import * as fromActions from '../../state/core.actions';
import * as fromAuthState from '../../state/reducer';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit,OnDestroy {

  authForm:FormGroup;
  authState:boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  _componentIsActive: boolean=true;

  constructor(
        private formBuilder:FormBuilder,
        private authenticationState:Store<fromAuthState.CoreState>,
        private _snackBar: MatSnackBar,
        private route:ActivatedRoute
      ) { }



  ngOnInit(): void {

    this.route.queryParams.subscribe((params:Params)=>{
        if(params.signupSuccess){
          this.openSnackBar(params.signupSuccess)
        }
    })

    this.route.queryParams.subscribe((params:Params)=>{
        if(params.warningMessage){
          this.openSnackBar(params.warningMessage)
        }
    })

    this.authenticationState.pipe(
      select(fromAuthState.getAuthErrorMessage),
      takeWhile(()=>this._componentIsActive)
      )
    .subscribe(message=>{
      if(message!=null){
        this.openSnackBar(message)
      }
    })

    this.authenticationState.pipe(
      select(fromAuthState.getAuthenticationState),
      takeWhile(()=>this._componentIsActive)
      )
    .subscribe(state=>{this.authState=state})


     this.authForm=this.formBuilder.group({
       email:["",[Validators.required,Validators.email]],
       password:["",[Validators.required,Validators.minLength(4)]],
     })
     
  }

  openSnackBar(message:string){
    this._snackBar.open(message, "Close",{
      duration: 3 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  
  onSubmit(logingDetails:FormGroup){
    if(logingDetails.valid){
      var auth=new Auth(
        logingDetails.value.email,
        logingDetails.value.password
      );
   
      this.authenticationState.dispatch(new fromActions.Login(auth))
    }
     
  }

  ngOnDestroy(): void {
      this._componentIsActive=false
  }

}
