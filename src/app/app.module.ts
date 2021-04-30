import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';

import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { BrowseComponent } from './Components/browse/browse.component';
import { BiddingsComponent } from './Components/biddings/biddings.component';
import { TournamentCardComponent } from './Components/browse/tournament-card/tournament-card.component';
import { TournamentDetailComponent } from './Components/browse/tournaments/tournament-detail/tournament-detail.component';
import { TournamentBannerComponent } from './Components/browse/banner/tournament-banner/tournament-banner.component';


import { GetTeamShortnamePipe } from './Pipes/get-team-shortname.pipe';
import { GetCurrencyPipe } from './Pipes/get-currency.pipe';




@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    BrowseComponent,
    BiddingsComponent,
    TournamentCardComponent,
    GetTeamShortnamePipe,
    TournamentDetailComponent,
    TournamentBannerComponent,
    GetCurrencyPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
