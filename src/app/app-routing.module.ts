import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiddingsComponent } from './Components/biddings/biddings.component';

import { BrowseComponent } from './Components/browse/browse.component';
import { TournamentDetailComponent } from './Components/browse/tournaments/tournament-detail/tournament-detail.component';

const routes: Routes = [
  {path:"home",component:BrowseComponent},
  {path:"biddings",component:BiddingsComponent},
  {path:"tournaments/:id",component:TournamentDetailComponent},
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"**",redirectTo:"home",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
