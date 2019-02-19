import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { SignUpComponent } from './sign-up/sign-up.component'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dailog: MatDialog){}

  openSignUpDialog(){
    this.dailog.open(SignUpComponent)
  }

}
