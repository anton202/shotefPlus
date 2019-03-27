import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SignInService } from './sign-in.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  statusMessage;
  isSuccessfullyLogedIn;
  displaySpinner = false;

  constructor(
    private signInService: SignInService,
    private dialogRef: MatDialogRef<SignInComponent>,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close()
  }

  onSignIn(loginValues) {
    this.displaySpinner = true;
    this.signInService.login(loginValues)
      .subscribe((response) => {
        this.displaySpinner = false;
        this.isSuccessfullyLogedIn = 'success';
        this.statusMessage = 'התחברתה בהצלחה'
        setTimeout(() => {
          this.closeDialog()
        }, 1500)
      },
        error => {
          this.displaySpinner = false;
          this.isSuccessfullyLogedIn = 'fail';
          this.statusMessage = 'ההתחברות נכשלה, נסה שוב או פנה למפתח האתר'
         }
      )
  }

  openSignInDialog() {
    this.dialogRef.close()
    this.dialog.open(SignUpComponent)
  }

}
