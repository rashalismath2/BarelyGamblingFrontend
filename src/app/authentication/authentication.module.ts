import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './authentication-routing';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/reducer';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './Components/Login/login/login.component';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    StoreModule.forFeature("authentication",reducer),
    FormsModule
  ]
})

export class AuthenticationModule {

 }