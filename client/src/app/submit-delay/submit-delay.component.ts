import { Component, OnInit } from '@angular/core';
import { SubmitDelayService } from './submit-delay.service'
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { SearchBusinessService } from '../search-business/search-business.service';
import { AppService } from '../app.service';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SharedService } from '../shared/shared.service';


@Component({
  selector: 'app-submit-delay',
  templateUrl: './submit-delay.component.html',
  styleUrls: ['./submit-delay.component.css']
})
export class SubmitDelayComponent implements OnInit {
  companyNameSuggestion = []
  submitDelayForm: FormGroup;
  isLoading = false;
  readingFiles = false;
  submitionStatus;
  statusMessage

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
      'company_name': new FormControl(null, this.componyNameDoesNotExist.bind(this)),
      'shotef_plus': new FormControl(null),
      'start_date_of_shotef_plus': new FormControl(null),
      'date_of_reciving_the_money': new FormControl(null),
      'days_of_delay': new FormControl(null),
      'comment': new FormControl(null),
      'proofFile': new FormControl(null,[this.sharedService.maxInputFiles])
    })
  }

  onChange() {
    if(this.submitDelayForm.value.proofFile){
    const files = this.submitDelayForm.value.proofFile.files;
    this.readingFiles = true;
    this.sharedService.readFile(files)
      .subscribe(files => { this.submitDelayForm.value.proofFile = files; this.readingFiles = false }) // this line mutates submitDelayForm object (not good...)
    }
  }

  submitDelay() {
    // check if user is loged in. if not prompt sign-in dialog
    if (!this.appService.isAuthenticated) {
      return this.dialog.open(SignInComponent)
    }
   
    this.isLoading = true
    this.submitDelayService.submitDelayToApi(this.submitDelayForm.value)
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

  searchForCompanyName() {
    this.searchBusinessService.requestCompanyNameFromApi(this.submitDelayForm.get('company_name').value)
      .subscribe(companyRecord => {
        this.companyNameSuggestion = companyRecord.result.records;
      },
        error => {
          console.log(error)
        })
  }

  //form control company_name validator
  componyNameDoesNotExist(control: FormControl) {
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
  

  twoProofFiles(control : FormControl){
    console.log(this.submitDelayForm)
    if(this.submitDelayForm.value.days_of_delay === 0){
      if(!control.value){
        return {'add2files': true}
      } else if(control.value.files.length < 2){
        return {'add2files': true}
      } else if( control.value.files.length >= 2){
        return null
      }
    }
    // if(this.submitDelayForm.value.days_of_delay === 0 && control.value.files.length < 2){
    //   return {'add2files': true}
    // } else if (this.submitDelayForm.value.days_of_delay === 0 && control.value.files.length >= 2)  {
    //   return null
    // }
  }

}

