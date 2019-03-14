import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { SignUpComponent } from './sign-up/sign-up.component'
import { SignInComponent } from './sign-in/sign-in.component';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private dailog: MatDialog, private appService: AppService) { }

  ngOnInit() {
    // checks if user is loged in and that the account is active
    this.appService.authenticateUser();
  }

  openSignUpDialog() {
    this.dailog.open(SignUpComponent)
  }

  openDialog() {
    if (this.appService.isAuthenticated) {
      // user area component
      this.dailog.open(SignInComponent)
    } else {
      this.dailog.open(SignInComponent)
    }
  }

}
