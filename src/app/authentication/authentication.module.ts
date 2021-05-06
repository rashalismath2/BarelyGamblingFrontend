import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './authentication-routing';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/reducer';
import {  ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Components/Login/login.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './Components/register/register.component';




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    AppRoutingModule,
    StoreModule.forFeature("authentication",reducer),
    ReactiveFormsModule,
    SharedModule
  ]
})

export class AuthenticationModule {

 }