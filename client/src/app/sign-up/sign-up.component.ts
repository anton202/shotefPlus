import { Component } from '@angular/core';
import { SignUpService } from './sign-up.service';
import { MatDialogRef } from '@angular/material';
import { registration } from './sign-up.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  
})
export class SignUpComponent  {
  isSuccessfullyRegistrated: string; 
  displaySpinner: boolean = false;
  statusMessage: string;

  constructor(private signUpService: SignUpService, private dialogRef:MatDialogRef<SignUpComponent>) { }

  public onClose(): void{
    this.dialogRef.close()
  }

  public onSignUp(formValues: registration): void{
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
  }

}
