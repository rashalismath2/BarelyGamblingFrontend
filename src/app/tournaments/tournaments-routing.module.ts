import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  {path:"tournaments/:id",component:TournamentDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
