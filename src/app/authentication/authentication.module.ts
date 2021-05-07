import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './authentication-routing';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/reducer';
import {  ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Components/Login/login.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './Components/register/register.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffect } from './state/authentication.effects';




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    StoreModule.forFeature("authentication",reducer),
    EffectsModule.forFeature([AuthenticationEffect]),
    ReactiveFormsModule,
  ]
})

export class AuthenticationModule {

 }