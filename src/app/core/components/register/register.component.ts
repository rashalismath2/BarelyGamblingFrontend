import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { SignupInput } from '../../../core/Entities/SignupInput';

import * as fromAuthActions from "../../state/authentication.actions"
import { CoreState } from '../../state/reducer';
import * as fromAuthState from '../../state/reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit,OnDestroy {

  authForm:FormGroup;
  imgURL: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  _componentIsActive: boolean=true;

  constructor(
    private authenticationState:Store<fromAuthState.CoreState>,
    private _snackBar: MatSnackBar,
    private formBuilder:FormBuilder,
    private authState:Store<CoreState>) { }

  ngOnDestroy(): void {
    this._componentIsActive=false;
  }

 
  setImage(files) {
    if (files.length === 0)
      return;
    var reader = new FileReader();
    
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }

    this.authForm.patchValue({
      profilePicture: files[0]
    });
    this.authForm.get('profilePicture').updateValueAndValidity()

  }

  ngOnInit(): void {
     this.authForm=this.formBuilder.group({
       email:["",[Validators.required,Validators.email]],
       password:["",[Validators.required,Validators.minLength(4)]],
       firstName:["",[Validators.required,Validators.minLength(3)]],
       lastName:["",[Validators.required,Validators.minLength(3)]],
       profilePicture:[""],
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
      var auth=new SignupInput(
        logingDetails.value.email,
        logingDetails.value.password,
        logingDetails.value.firstName,
        logingDetails.value.lastName,
        logingDetails.value.profilePicture,
      );

      this.authState.dispatch(new fromAuthActions.Signup(auth))
    }
  }


}
