import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SignInService } from './sign-in.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
 public statusMessage: string;
 public isSuccessfullyLogedIn: string;
 public displaySpinner: boolean = false;
 public signInForm: FormGroup;

  constructor(
    private signInService: SignInService,
    private dialogRef: MatDialogRef<SignInComponent>,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    })
  }

  public onSignIn(): void {
    this.displaySpinner = true;
    console.log(this.signInForm.value)
    this.signInService.login(this.signInForm.value)
      .subscribe((response) => {
        this.displaySpinner = false;
        this.isSuccessfullyLogedIn = 'success';
        this.statusMessage = 'התחברתה בהצלחה'
      },
        error => {
          this.displaySpinner = false;
          this.isSuccessfullyLogedIn = 'fail';
          this.statusMessage = 'ההתחברות נכשלה, נסה שוב או פנה למפתח האתר'
        }
      )
  }

  public onClose(): void {
    this.dialogRef.close()
  }

  public openSignInDialog(): void {
    this.dialogRef.close()
    this.dialog.open(SignUpComponent)
  }

}
