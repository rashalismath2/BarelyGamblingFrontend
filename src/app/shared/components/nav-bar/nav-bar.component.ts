import { Component, Input, OnInit } from '@angular/core';
import { ILoginDto } from '../../../core/Entities/ILoginDto';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() authUser:ILoginDto

  constructor() { }

  ngOnInit(): void {

  }

}
