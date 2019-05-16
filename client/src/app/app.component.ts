import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { SignUpComponent } from './sign-up/sign-up.component'
import { SignInComponent } from './sign-in/sign-in.component';
import { AppService } from './app.service';
import { UserAreaComponent } from './user-area/user-area.component';
import { ConfirmActionComponent } from './shared/confirm-action/confirm-action.component';
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
      this.dailog.open(UserAreaComponent)
    } else {
      this.dailog.open(SignInComponent)
    }
  }

  private logOut(){
    console.log('logOut')
  }

  public confirmLogOut(){
    const dialogRef = this.dailog.open(ConfirmActionComponent,{data:{text:'להתנתק מהמערכת?'}})
    dialogRef.afterClosed().subscribe(actionConfirmed =>{
      if(actionConfirmed){
        this.logOut()
      }
    })
      
  }

}
