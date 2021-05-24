import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from '../core/guards/authorization.guard';
import { CreateTournamentComponent } from './components/create-tournament/create-tournament.component';
import { TournamentDetailComponent } from './components/tournament-detail/tournament-detail.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { TournamentsResolverService } from './services/tournaments-resolver.service';


const routes: Routes = [
  {
    path:"tournaments",component:TournamentsComponent,
    resolve:{
      tournaments:TournamentsResolverService
    }
  },
  {path:"tournaments/create",component:CreateTournamentComponent,canActivate:[AuthorizationGuard]},
  {path:"tournaments/:id",component:TournamentDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }
