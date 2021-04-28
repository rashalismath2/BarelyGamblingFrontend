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

import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { BrowseComponent } from './Components/browse/browse.component';
import { BiddingsComponent } from './Components/biddings/biddings.component';
import { TournamentCardComponent } from './Components/browse/tournament-card/tournament-card.component';

import { GetTeamShortnamePipe } from './Pipes/get-team-shortname.pipe';




@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    BrowseComponent,
    BiddingsComponent,
    TournamentCardComponent,
    GetTeamShortnamePipe,
    
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
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
