import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from '../core/guards/authorization.guard';
import { CreateTournamentComponent } from './components/create-tournament/create-tournament.component';
import { TournamentDetailComponent } from './components/tournament-detail/tournament-detail.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { TournamentResolverService } from './resolvers/tournament-resolver.service';
import { TournamentsResolverService } from './services/tournaments-resolver.service';
import { TournamentComponent } from './tournament/tournament.component';


const routes: Routes = [
  {path:"tournaments/create",component:CreateTournamentComponent,canActivate:[AuthorizationGuard]},
  {
    path:"tournaments/:id",
    component:TournamentComponent,
    resolve:{
      tournament:TournamentResolverService
    },
    children:[
      {
        path:"",component:TournamentDetailComponent
      },
      {
        path:"edit",component:CreateTournamentComponent
      },
    ]
  },
    
  {
    path:"tournaments",component:TournamentsComponent,
    resolve:{
      tournaments:TournamentsResolverService
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }
