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
  statusMessage: string;
  isSuccessfullyLogedIn: string;
  displaySpinner: boolean = false;

  constructor(
    private signInService: SignInService,
    private dialogRef: MatDialogRef<SignInComponent>,
    private dialog: MatDialog
  ) { }

  ngOnInit() { }

  public onSignIn(loginValues: { email: string, password: string }): void {
    this.displaySpinner = true;
    this.signInService.login(loginValues)
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
