import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SignInComponent>) { }

  ngOnInit() {
  }

}
