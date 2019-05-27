import { Component, OnInit } from '@angular/core';
import { SignUpService } from './sign-up.service';
import { MatDialogRef } from '@angular/material';
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
      'email': new FormControl(null, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'employmentType': new FormControl(null),
      'freeLancerId': new FormControl(null, [Validators.required, Validators.minLength(9)]),
      'companyId': new FormControl(null, Validators.required)
    }, this.onlyOneEmploymentTypeCanBeSubmitedValidator)

    this.onlyOneEmploymentTypeRequired()
  }

  public onClose(): void {
    this.dialogRef.close()
  }

  public onSignUp(): void {
    if (!this.signUpForm.valid) {
      return
    }
    this.displaySpinner = true;
    this.signUpService.registerAccount(this.signUpForm.value)
      .subscribe(() => {
        this.handleRespone('success', 'נרשמתה בהצלחה, מייל ישלך אליך ברגע שהמשתמש יאומת')
      },
        error => {
          this.handleRespone('fail', 'משהו השתבש, נסה שוב או פנה לתמיכה טכנית')

        })
  }

  private handleRespone(isSuccessfullyRegistrated: string, registrationStatusMessage: string): void {
    this.displaySpinner = false;
    this.isSuccessfullyRegistrated = isSuccessfullyRegistrated
    this.statusMessage = registrationStatusMessage;
  }

  private onlyOneEmploymentTypeRequired(): void {
    const employmentType = this.signUpForm.get('employmentType');
    const freeLancer = this.signUpForm.get('freeLancerId');
    const companyId = this.signUpForm.get('companyId');

    employmentType.valueChanges.subscribe(value => {
      if (value === 'freeLancer') {
        companyId.setValidators(null)
        freeLancer.setValidators([Validators.required, Validators.minLength(9)])
      }
      if (value === 'company') {
        freeLancer.setValidators(null)
        companyId.setValidators([Validators.required])
      }
      companyId.updateValueAndValidity();
      freeLancer.updateValueAndValidity()
    })
  }

  private onlyOneEmploymentTypeCanBeSubmitedValidator(form: FormGroup): {} | null {
    const freeLancerId = form.controls.freeLancerId.value;
    const companyId = form.controls.companyId.value;

    if (companyId && freeLancerId) {
      return { twoEmploymentTypesSubmited: true }
    }
    return null;
  }

}


// only one vaue should be submited freeLance or compnay id