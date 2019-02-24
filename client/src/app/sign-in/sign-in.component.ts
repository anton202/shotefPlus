import { Component, OnInit } from '@angular/core';
import { SignInService } from './sign-in.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  errorMessage
  successfullyLogedIn = false

  constructor(private signInService: SignInService, private dialogRef:MatDialogRef<SignInComponent>) { }

  ngOnInit() {
  }

  closeDialog(){
    this.dialogRef.close()
  }

  onSignIn(loginValues){
    this.signInService.login(loginValues)
    .subscribe((response)=>{
      this.successfullyLogedIn = true;
      setTimeout(()=>{
        this.closeDialog()
      },1500)
    },
    error => {}
    )
  }

}
