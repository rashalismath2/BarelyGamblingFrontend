import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './root/app-routing.module';
import { AppComponent } from './root/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';

import { BiddingsComponent } from './root/Components/biddings/biddings.component';


import { StoreModule } from '@ngrx/store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { HomeComponent } from './root/Components/home/home.component';

import { AuthenticationModule } from './authentication/authentication.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { SharedModule } from './shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './authentication/services/authentication.service';
import { ErrorInterceptor, TokenIntercepterService } from './root/Services/token.intercepter.service';


@NgModule({
  declarations: [
    AppComponent,
    BiddingsComponent,


    HomeComponent,

  ],
  imports: [
    SharedModule,
    AuthenticationModule,
    TournamentsModule,

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
  providers: [
    // AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercepterService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


 }
