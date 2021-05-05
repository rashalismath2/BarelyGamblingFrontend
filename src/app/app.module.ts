import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavBarComponent } from './Components/nav-bar/nav-bar.component';

import { BiddingsComponent } from './Components/biddings/biddings.component';


import { StoreModule } from '@ngrx/store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { HomeComponent } from './Components/home/home.component';

import { AuthenticationModule } from './authentication/authentication.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { SharedModule } from './shared/shared.module';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,

    BiddingsComponent,


    HomeComponent,

  ],
  imports: [
    AuthenticationModule,
    TournamentsModule,
    SharedModule,

    AppRoutingModule,

    StoreModule.forRoot({}),
    EffectsModule.forRoot([]), 
    
    StoreDevtoolsModule.instrument({
      name:"App a",
      maxAge:25,
      logOnly:environment.production
    }),
    BrowserAnimationsModule,
    FormsModule,
    


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


 }
