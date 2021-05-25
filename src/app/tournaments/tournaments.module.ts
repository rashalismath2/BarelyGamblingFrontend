import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { TournamentDetailComponent } from './components/tournament-detail/tournament-detail.component';
import { TournamentCardComponent } from './components/tournament-card/tournament-card.component';
import { TournamentBannerComponent } from './components/banner/tournament-banner/tournament-banner.component';

import { GetTeamShortnamePipe } from './pipes/get-team-shortname.pipe';
import { GetCurrencyPipe } from './pipes/get-currency.pipe';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { TournamentEffects } from './state/tournament.effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/reducer';
import { TournamentRoutingModule } from './tournaments-routing.module';
import { TournamentsResolverService } from './services/tournaments-resolver.service';
import { TournamentsListComponent } from './components/tournaments-list/tournaments-list.component';
import { CreateTournamentComponent } from './components/create-tournament/create-tournament.component';
import { TournamentComponent } from './tournament/tournament.component';


@NgModule({
  declarations: [
    TournamentsComponent,
    TournamentDetailComponent,
    TournamentCardComponent,
    TournamentBannerComponent,

    GetTeamShortnamePipe,
    GetCurrencyPipe,
    TournamentsListComponent,
    CreateTournamentComponent,
    TournamentComponent,
  ],
  providers:[
    TournamentsResolverService
  ],
  imports: [
    CommonModule,
    SharedModule,
    TournamentRoutingModule,
    StoreModule.forFeature("tournaments",reducer),
    EffectsModule.forFeature([TournamentEffects]), 
  ],
  exports:[TournamentsComponent]
})
export class TournamentsModule { }
