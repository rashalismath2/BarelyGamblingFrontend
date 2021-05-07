import { Component, Input, OnInit } from '@angular/core';
import { ISignIn } from 'src/app/Entities/ISignIn';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() authUser:ISignIn

  constructor() { }

  ngOnInit(): void {

  }

}
