import { Component } from '@angular/core';
import { SignUpService } from './sign-up.service';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [ SignUpService ]
})
export class SignUpComponent  {
  successfullyRegistrated 
  isRegisterClicked = false;

  constructor(private signUpService: SignUpService, private dialogRef:MatDialogRef<SignUpComponent>) { }

  onClose(){
    this.dialogRef.close()
  }

  onSignUp(formValues){
    this.isRegisterClicked = true;
    
    this.signUpService.registerAccount(formValues)
      .subscribe((response)=>{
        this.successfullyRegistrated = true;
      },
      error =>{
        this.successfullyRegistrated = false
      })

    console.log(formValues);
  }

}
