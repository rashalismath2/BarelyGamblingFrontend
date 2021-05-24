import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable'
import { ILoginDto } from 'src/app/core/Entities/ILoginDto';
import { takeWhile } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import * as fromAuth from '../../../core/state/reducer';
import * as fromAuthActions from "../../../core/state/core.actions"


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit ,OnDestroy{

  _authUser$: Observable<ILoginDto>
  _componenetActive:boolean

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  constructor(
    private _snackBar: MatSnackBar,
    private _authenticactionStore: Store<fromAuth.CoreState>) 
  {

  }
  ngOnDestroy(): void {
    this._componenetActive=false
  }

  ngOnInit(): void {
    this._authUser$ = this._authenticactionStore
      .pipe(
        select(fromAuth.getAuthUser)
      )

  this._authenticactionStore
      .pipe(
        select(fromAuth.getSignOutState),
        takeWhile(()=>this._componenetActive))
      .subscribe((status:boolean)=>{
        if(status){
          this.openSnackBar("Signing out")
        }
      })
      
  }

  openSnackBar(message:string){
    this._snackBar.open(message, "Close",{
      duration: 3 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  

  onLogoutEvent(event){
    this._authenticactionStore.dispatch(new fromAuthActions.Logout())
  }


}
