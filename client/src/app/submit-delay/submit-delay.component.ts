import { Component, OnInit } from '@angular/core';
import { SubmitDelayService } from './submit-delay.service'
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { SearchBusinessService } from '../search-business/search-business.service';
import { AppService } from '../app.service';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-submit-delay',
  templateUrl: './submit-delay.component.html',
  styleUrls: ['./submit-delay.component.css']
})
export class SubmitDelayComponent implements OnInit {
  companyNameSuggestion = []
  submitDelayForm: FormGroup;
  isLoading = false;
  submitionStatus;

  constructor(
    private submitDelayService: SubmitDelayService,
    private searchBusinessService: SearchBusinessService,
    private dialog: MatDialog,
    private appService: AppService
    ) {}

  ngOnInit() {
    //initialize reactive form in ngOnInit for maitaining readabilety 
    this.submitDelayForm = new FormGroup({
      'company_name': new FormControl(null, this.componyNameDoesNotExist.bind(this)),
      'shotef_plus': new FormControl(null),
      'start_date_of_shotef_plus': new FormControl(null),
      'date_of_reciving_the_money': new FormControl(null),
      'days_of_delay': new FormControl(null),
      'comment': new FormControl(null)
    })
  }

  submitDelay() {
    // check if user is loged in. if not prompt sign-in dialog
    if(!this.appService.isAuthenticated){
      return this.dialog.open(SignInComponent)
    }
    console.log(this.submitDelayForm.value);
    this.isLoading = true
    this.submitDelayService.submitDelayToApi(this.submitDelayForm.value)
      .subscribe(() => {
        this.isLoading = false;
        this.submitionStatus = 'האיחור בתשלום דווח בהצלחה';
      },
        () => this.submitionStatus = 'האיחור בתשלום לא דווח, נסה שנית'
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

}

