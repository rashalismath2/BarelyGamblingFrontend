import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './root/app-routing.module';
import { AppComponent } from './root/app.component';

import { environment } from '../environments/environment';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor, TokenIntercepterService } from './core/services/token-intercepter.service';

import { BiddingsModule } from './biddings/biddings.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    CoreModule,
    SharedModule,
    TournamentsModule,
    BiddingsModule,
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
