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
  isSuccessfullyRegistrated 
  displaySpinner = false;
  statusMessage;

  constructor(private signUpService: SignUpService, private dialogRef:MatDialogRef<SignUpComponent>) { }

  onClose(){
    this.dialogRef.close()
  }

  onSignUp(formValues){
    this.displaySpinner = true;
    
      this.signUpService.registerAccount(formValues)
        .subscribe((response)=>{
          this.displaySpinner = false;
          this.isSuccessfullyRegistrated = 'success';
          this.statusMessage = "נרשמתה בהצלחה, מייל ישלך אליך ברגע שהמשתמש יאומת"
        },
        error =>{
          this.displaySpinner = false;
          this.isSuccessfullyRegistrated = 'fail'
          this.statusMessage = 'משהו השתבש, נסה שוב או פנה למפתח האתר'
        })

    

    console.log(formValues);
  }

}
