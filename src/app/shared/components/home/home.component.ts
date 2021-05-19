import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromAuth from '../../../core/state/reducer';

import { Observable } from 'rxjs/Observable'
import { ILoginDto } from 'src/app/core/Entities/ILoginDto';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  _authUser$: Observable<ILoginDto>

  constructor(
    private _authenticactionStore: Store<fromAuth.CoreState>) 
  {

  }

  ngOnInit(): void {
    this._authUser$ = this._authenticactionStore
      .pipe(
        select(fromAuth.getAuthUser)
      )
  }


}
