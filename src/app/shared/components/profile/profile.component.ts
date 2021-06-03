import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ILoginDto } from 'src/app/core/Entities/ILoginDto';
import { UpdateUserDto } from 'src/app/core/Entities/UpdateUserDto';

import * as fromCoureState from '../../../core/state/reducer';
import * as fromCoreActions from '../../../core/state/core.actions';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit,OnDestroy {

  @Input() authUser:ILoginDto
  editProfile:boolean
  userDetailUpdateStatus:boolean
  userForm:FormGroup
  editPassword: boolean;
  private _componentIsActive: boolean;
  errorMessages:string
  userDetailUpdateSuccessStatus: boolean;

  constructor(private fb:FormBuilder,private coreState:Store<fromCoureState.CoreState>) { 
   
  }
  ngOnDestroy(): void {
    this._componentIsActive=false
  }
  

  ngOnInit(): void {
    this._componentIsActive=true
    
    this.getUserDetailsUpdateErrors();
    this.getUserDetailsUpdateStatus();
    this.getUserDetailUpdateSuccessStatus();

    this.userForm=this.fb.group({
      firstName:[this.authUser.user.firstName,[Validators.required,Validators.minLength(3)]],
      lastName:[this.authUser.user.lastName,[Validators.required,Validators.minLength(3)]],
      oldPassword:"",
      newPassword:"",
      profilePicture:""
    })
  }

  getUserDetailsUpdateErrors(){
    this.coreState.pipe(
      select(fromCoureState.getAuthErrorMessage),
      takeWhile(()=>this._componentIsActive)
      )
    .subscribe(message=>{
      if(message!=null){
        this.errorMessages=message
      }
    })
  }

  getUserDetailsUpdateStatus(){
    this.coreState.pipe(
      select(fromCoureState.getUserDetailUpdateStatus),
      takeWhile(()=>this._componentIsActive)
      )
    .subscribe(status=>{
        this.userDetailUpdateStatus=status
    })
  }
  getUserDetailUpdateSuccessStatus(){
    this.coreState.pipe(
      select(fromCoureState.getUserDetailUpdateSuccessStatus),
      takeWhile(()=>this._componentIsActive)
      )
    .subscribe(status=>{
        this.userDetailUpdateSuccessStatus=status
        if(status){
          this.editProfile=false
        }
    })
  }

  setImageForForm(event){
    this.userForm.patchValue({
      profilePicture:event
    })
    this.userForm.updateValueAndValidity();
    
    this.editProfile=true
  }
  StartEdit(command){
    if(!command){
      this.userForm.patchValue({
        profilePicture:""
      })
    }
    this.editProfile=command
  }
  changePassword(){
    this.editPassword=!this.editPassword
    if(!this.editPassword){
      this.userForm.patchValue({
        oldPassword:"",
        newPassword:"",
      })
    }
  }

  passwordsOnChange(){
    if(this.editPassword){
      var oldPassword=this.userForm.get("oldPassword")
      var newPassword=this.userForm.get("newPassword")
  
      var notValid=(oldPassword.value.trim().length<4)
              || (newPassword.value.trim().length<4)
      if(notValid){
        oldPassword.setErrors({'incorrect': true})
        newPassword.setErrors({'incorrect': true})
      }
    }
  }

  onSubmit(userDetails:FormGroup){
    if(this.userForm.invalid) return;

    var updateUser=new UpdateUserDto();
    updateUser.FirstName=userDetails.get("firstName").value;
    updateUser.LastName=userDetails.get("lastName").value;
    updateUser.UserId=this.authUser.user.id;
    updateUser.profilePictureChangeRequest=false;
    updateUser.passwordChangeRequest=false;

    if(this.editPassword && this.userForm.get("profilePicture").value!=""){
      updateUser.ProfilePicture=userDetails.get("profilePicture").value;
      updateUser.profilePictureChangeRequest=true;

      updateUser.OldPassword=userDetails.get("oldPassword").value;
      updateUser.NewPassword=userDetails.get("newPassword").value;
      updateUser.passwordChangeRequest=true;
    }
    else if(this.editPassword && this.userForm.get("profilePicture").value==""){
      updateUser.OldPassword=userDetails.get("oldPassword").value;
      updateUser.NewPassword=userDetails.get("newPassword").value;
      updateUser.passwordChangeRequest=true;
    }
    else if(!this.editPassword && this.userForm.get("profilePicture").value!=""){
      updateUser.ProfilePicture=userDetails.get("profilePicture").value;
      updateUser.profilePictureChangeRequest=true;
    }

    this.coreState.dispatch(new fromCoreActions.UpdateUserDetails(updateUser));
    
  }
  
}
