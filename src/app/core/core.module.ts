import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './guards/import.guard';
import { StoreModule } from '@ngrx/store';
import { CoreRoutingModule } from './core-routing';

import {reducer} from "./state/reducer"
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './components/Login/login.component';

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
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule:CoreModule) {
    throwIfAlreadyLoaded(parentModule,"CoreModule")
  }

 }
