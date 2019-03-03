import { Component, OnInit } from '@angular/core';
import { SubmitDelayService } from './submit-delay.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  constructor(private submitDelayService: SubmitDelayService) { }

  ngOnInit() {
    //initialize reactive form in ngOnInit for maitaining readabilety 
    this.submitDelayForm = new FormGroup({
      'company_name': new FormControl(null,this.componyNameDoesNotExist.bind(this)),
      'shotef_plus': new FormControl(null),
      'start_date_of_shotef_plus': new FormControl(null),
      'date_of_reciving_the_money': new FormControl(null),
      'days_of_delay': new FormControl(null),
      'comment': new FormControl(null)
    })
  }

  submitDelay() {
    this.isLoading = true
    this.submitDelayService.submitDelayToApi(this.submitDelayForm.value)
        .subscribe(() =>{
          this.isLoading = false;
          this.submitionStatus = 'האיחור בתשלום דווח בהצלחה';
        },
        () => this.submitionStatus = 'האיחור בתשלום לא דווח, נסה שנית'
        )
   
  }

  searchForCompanyName() {
    this.submitDelayService.requestCompanyNameFromApi(this.submitDelayForm.get('company_name').value)
      .subscribe(companyRecord => {
        this.companyNameSuggestion = companyRecord.result.records;
      },
        error => {
          console.log(error)
        })
  }

  setFormControlCompanyNameValue(companyName) {
    this.submitDelayForm.patchValue({
      'company_name': companyName
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

