import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { SubmitDelayService } from './submit-delay.service'
import { AppService } from '../app.service';
import { SignInComponent } from '../sign-in/sign-in.component';
import { ReportService } from '../report/report.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-submit-delay',
  templateUrl: './submit-delay.component.html',
  styleUrls: ['./submit-delay.component.css']
})
export class SubmitDelayComponent implements OnInit, AfterViewInit {
  isLoading = false;
  submitionStatus;
  statusMessage
  report:FormGroup


  constructor(
    private submitDelayService: SubmitDelayService,
    private dialog: MatDialog,
    private appService: AppService,
    private reportService: ReportService

  ){}

  ngOnInit() {
    console.log(this.report)
  }

  ngAfterViewInit(){
    this.report = this.reportService.formValue;
    console.log(this.report)
  }

  submitDelay() {
    // check if user is loged in. if not prompt sign-in dialog
    if (!this.appService.isAuthenticated) {
      return this.dialog.open(SignInComponent)
    }

    this.isLoading = true
    this.submitDelayService.submitDelayToApi(this.report.value)
      .subscribe(() => {
        this.isLoading = false;

        this.submitionStatus = 'success';
        this.statusMessage = 'הדוח דווח בהצלחה'
        setTimeout(() => this.submitionStatus = null, 4000)
      },
        () => {
          this.isLoading = false
          this.submitionStatus = 'fail';
          this.statusMessage = 'משהו השתבש בעת הדיווח,נסה שוב או פנה למפתח האתר'
          setTimeout(() => this.submitionStatus = null, 4000)
        }
      )

  }




}

