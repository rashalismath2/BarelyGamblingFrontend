import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import * as fromAuth from 'src/app/authentication/state/reducer';
import { ITournament } from 'src/app/Entities/ITournament';
import { ISignIn } from 'src/app/Entities/ISignIn';
import { Observable } from 'rxjs/Observable'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _authenticactionStore:Store<fromAuth.AuthState>) {
   
   }

  public selectedTab:string="tournaments"
  public _tournaments:ITournament[]=[]

  public _authUser$:Observable<ISignIn>
  
  ngOnInit(): void {
      this._authUser$=this._authenticactionStore
            .pipe(
                select(fromAuth.getAuthUser)
            )            
  }

  setCurrentTab(selected):void{
    this.selectedTab=selected;
  }

}
