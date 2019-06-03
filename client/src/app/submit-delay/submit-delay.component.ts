import { Component, OnInit } from '@angular/core';
import { SubmitDelayService } from './submit-delay.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';

import { SearchBusinessService } from '../search-business/search-business.service';
import { AppService } from '../app.service';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SharedService } from '../shared/services/shared.service';
import { FileValidator } from '../../../node_modules/ngx-material-file-input'

@Component({
  selector: 'app-submit-delay',
  templateUrl: './submit-delay.component.html',
  styleUrls: ['./submit-delay.component.css']
})
export class SubmitDelayComponent implements OnInit {
  public companyNameSuggestion: Array<{}> = []
  public submitDelayForm: FormGroup;
  public isLoading: boolean = false;
  public readingFiles: boolean = false;
  public submitionStatus: string;
  public statusMessage: string
  private totalMaxFilesSize: number = 10000000;

  constructor(
    private submitDelayService: SubmitDelayService,
    private searchBusinessService: SearchBusinessService,
    private dialog: MatDialog,
    private appService: AppService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    //initialize reactive form in ngOnInit for maitaining readabilety 
    this.submitDelayForm = new FormGroup({
      'company_name': new FormControl(null, [this.componyNameDoesNotExist.bind(this), Validators.required]),
      'shotef_plus': new FormControl(null, Validators.required),
      'days_of_delay': new FormControl(null, Validators.required),
      'comment': new FormControl(null),
      'evidence': new FormControl(null, [this.sharedService.maxInputFiles, FileValidator.maxContentSize(this.totalMaxFilesSize)])
    })
  }

  public onChange(): void {
    if (this.submitDelayForm.value.evidence) {
      const files = this.submitDelayForm.value.evidence.files;
      console.log(files)
      this.readingFiles = true;
      this.sharedService.readFile(files)
        .subscribe(files => { this.submitDelayForm.value.evidence = files; this.readingFiles = false }) // this line mutates submitDelayForm object (not good...)
    }
  }

  public submitDelay(): MatDialogRef<SignInComponent> {
    // check if user is loged in. if not prompt sign-in dialog
    if (!this.appService.isAuthenticated) {
      return this.dialog.open(SignInComponent)
    }

    this.isLoading = true
    this.submitDelayService.submitDelayToApi(this.submitDelayForm.value)
      .subscribe(() => {
        this.handelRespone('success','הדוח דווח בהצלחה')
        this.submitDelayForm.reset()
      },
        () => {
          this.handelRespone('fail','משהו השתבש בעת הדיווח, נסה שוב או פנה לתמיכה טכנית')
        }
      )
  }

  public searchForCompanyName(): void {
    this.searchBusinessService.requestCompanyNameFromApi(this.submitDelayForm.get('company_name').value)
      .subscribe(companyRecord => {
        this.companyNameSuggestion = companyRecord.result.records;
      },
        error => {
          console.log(error)
        })
  }

  private handelRespone(status: string, message: string): void{
    this.isLoading = false;
    this.submitionStatus = status;
    this.statusMessage = message;
    setTimeout(() => this.submitionStatus = null, 6000)
  }

  //form control company_name validator
 private componyNameDoesNotExist(control: FormControl): boolean | {} {
    if (this.companyNameSuggestion.length === 0) {
      return { 'companyNameDoesNotExist': true }
    } else {
      let isCompanyNameExist = this.companyNameSuggestion.map(companyRecord => {
        if (companyRecord['שם חברה'] === control.value) {
          return true;
        }
      })
      if (isCompanyNameExist.indexOf(true) !== -1) {
        return null
      } else {
        return { 'companyNameDoesNotExist': true }
      }
    }
  }

}

