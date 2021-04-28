import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiddingsComponent } from './Components/biddings/biddings.component';

import { BrowseComponent } from './Components/browse/browse.component';

const routes: Routes = [
  {path:"home",component:BrowseComponent},
  {path:"biddings",component:BiddingsComponent},
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"**",redirectTo:"home",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
