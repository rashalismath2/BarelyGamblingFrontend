import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SignupInput } from '../../../root/Entities/SignupInput';

import * as fromAuthActions from "../../state/authentication.actions"
import { AuthState } from '../../state/reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  authForm:FormGroup;
  imgURL: any;

  constructor(private formBuilder:FormBuilder,private authState:Store<AuthState>) { }

 
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
