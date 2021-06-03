import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {

  imgURL: any;
  @Input() userCover:string
  @Output() profileImage:EventEmitter<File>=new EventEmitter<File>();

  constructor() { }

  ngOnInit(): void {
  }

   
  setImage(files) {
    if (files.length === 0)
      return;
    var reader = new FileReader();
    
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
    this.profileImage.emit(files[0])
  }

}
