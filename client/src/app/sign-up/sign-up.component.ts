import { Component, OnInit } from '@angular/core';
import { SignUpService } from './sign-up.service';
import { MatDialogRef } from '@angular/material';
import { registration } from './sign-up.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],

})
export class SignUpComponent implements OnInit {
  isSuccessfullyRegistrated: string;
  displaySpinner: boolean = false;
  statusMessage: string;
  signUpForm: FormGroup;

  constructor(private signUpService: SignUpService, private dialogRef: MatDialogRef<SignUpComponent>) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'employmentType': new FormControl(null),
      'freeLancerId': new FormControl(null, [Validators.required, Validators.minLength(9)]),
      'companyId': new FormControl(null, Validators.required)
    })
  }

  public onClose(): void {
    this.dialogRef.close()
  }

  public onSignUp(): void {
    if (this.signUpForm.valid === false) {
      return
    }
    this.displaySpinner = true;
    this.signUpService.registerAccount(this.signUpForm.value)
      .subscribe(() => {
        this.handleRespone('success','נרשמתה בהצלחהת מייל ישלך אליך ברגע שהמשתמש יאומת')
      },
        error => {
          this.handleRespone('fail','משהו השתבש, נסה שוב או פנה לתמיכה טכנית')
        })
  }

  private handleRespone(isSuccessfullyRegistrated: string,registrationStatusMessage:string): void{
    this.displaySpinner = false;
    this.isSuccessfullyRegistrated = isSuccessfullyRegistrated
    this.statusMessage = registrationStatusMessage;
  }

}
