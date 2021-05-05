import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';


import * as fromAuth from "../../../state/reducer"
import * as fromAuthActions from "../../../state/authentication.actions"
import { User } from 'src/app/Entities/User';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { Auth } from 'src/app/Entities/Auth';
import { ISignIn } from 'src/app/Entities/ISignIn';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private store:Store<fromAuth.State>,private authService:AuthenticationService) { }

  email:string;
  password:string;

  user: ISignIn;

  ngOnInit(): void {
     this.store.pipe(select(fromAuth.getAuthUser)).subscribe(user=>{
       this.user=user
     });
  }
  onClickSubmit(data) {

    var user =new User();
    user.SetAuthenticationFields(this.email,this.password)

    this.authService.signIn(new Auth(this.email,this.password))
    .subscribe({
      next:user=>   this.store.dispatch(new fromAuthActions.SetUser(user))
    })

 
    this.email=""
    this.password=""
 }
}
