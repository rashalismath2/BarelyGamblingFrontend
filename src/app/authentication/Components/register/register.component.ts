import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  authForm:FormGroup;
  imgURL: any;

  constructor(private formBuilder:FormBuilder) { }

 
  preview(files) {
    if (files.length === 0)
      return;
    var reader = new FileReader();
    
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  ngOnInit(): void {
     this.authForm=this.formBuilder.group({
       email:["",[Validators.required,Validators.email]],
       password:["",[Validators.required,Validators.minLength(4)]],
       firstName:["",[Validators.required,Validators.minLength(3)]],
       lastName:["",[Validators.required,Validators.minLength(3)]],
       profileCover:[""],
     })
  }

  onSubmit(logingDetails:FormGroup){
    
  }


}