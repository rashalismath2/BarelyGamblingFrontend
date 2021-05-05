import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentDetailComponent } from './components/tournament-detail/tournament-detail.component';


const routes: Routes = [
  {path:"tournaments/{:id}",component:TournamentDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
