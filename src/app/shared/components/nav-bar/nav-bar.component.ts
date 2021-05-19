import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ILoginDto } from '../../../core/Entities/ILoginDto';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() authUser:ILoginDto
  @Output() logoutEvent:EventEmitter<boolean>=new EventEmitter<boolean>(); 

  constructor() { }

  ngOnInit(): void {

  }

  logout(){
    this.logoutEvent.emit(true)
  }

}
