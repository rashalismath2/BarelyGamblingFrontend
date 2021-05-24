import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { throwIfAlreadyLoaded } from './guards/import.guard';
import { CoreRoutingModule } from './core-routing';
import {reducer} from "./state/reducer"
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './components/Login/login.component';
import {CoreEffect} from "./state/core.effects"

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreRoutingModule,
    StoreModule.forFeature("core",reducer),
    EffectsModule.forFeature([CoreEffect]), 
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule:CoreModule) {
    throwIfAlreadyLoaded(parentModule,"CoreModule")
  }

 }
