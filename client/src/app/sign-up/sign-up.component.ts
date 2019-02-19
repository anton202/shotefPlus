import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

// This component is a material dialog. 
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent  {
  registretitonCompleated = false;

  constructor(public dialogRef: MatDialogRef<SignUpComponent>) { }

  signUp(formValues){
    console.log(formValues);
    this.registretitonCompleated = true;
  }

}
