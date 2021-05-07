import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import * as fromAuth from 'src/app/authentication/state/reducer';
import { ITournament } from 'src/app/Entities/ITournament';
import { ISignIn } from 'src/app/Entities/ISignIn';
import { Observable } from 'rxjs/Observable'
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  selectedTab: string = "tournaments"
  _tournaments: ITournament[] = []
  _authUser$: Observable<ISignIn>

  constructor(
    private _authenticactionStore: Store<fromAuth.AuthState>,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        if (params.loginSuccess) {
          this._snackBar.open(params.loginSuccess, "Close", {
            duration: 3 * 1000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      })

    this._authUser$ = this._authenticactionStore
      .pipe(
        select(fromAuth.getAuthUser)
      )


  }

  setCurrentTab(selected): void {
    this.selectedTab = selected;

  }
  setSelectedTOurnament(tournamentSelected: ITournament): void {
    this.router.navigate(["tournaments", tournamentSelected.id]);
  }

}
