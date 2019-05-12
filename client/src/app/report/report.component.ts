import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SearchBusinessService } from '../search-business/search-business.service';
import { SharedService } from '../shared/shared.service';

import { FileValidator } from '../../../node_modules/ngx-material-file-input'
import { ReportService } from './report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  public submitDelayForm: FormGroup;
  public readingFiles = false;
  private companyNameSuggestion = []
  private totalMaxFilesSize = 10000000;

  constructor(
    private searchBusinessService: SearchBusinessService,
    private sharedService: SharedService,
    private reportService: ReportService
  ) { }

  ngOnInit() {
    //initialize reactive form in ngOnInit for maitaining readabilety 
    this.reportService.formValue = this.submitDelayForm = new FormGroup({
      'company_name': new FormControl(null, [this.componyNameDoesNotExist.bind(this), Validators.required]),
      'shotef_plus': new FormControl(null, Validators.required),
      'days_of_delay': new FormControl(null, Validators.required),
      'comment': new FormControl(null),
      'evidence': new FormControl(null, [this.sharedService.maxInputFiles, FileValidator.maxContentSize(this.totalMaxFilesSize)])
    })
    console.log(this.reportService.formValue)
}

 public onChange() {
    if (this.submitDelayForm.value.evidence) {
      const files = this.submitDelayForm.value.evidence.files;
      this.readingFiles = true;
      this.sharedService.readFile(files)
        .subscribe(files => { this.submitDelayForm.value.evidence = files; this.readingFiles = false }) // this line mutates submitDelayForm object (not good...)
    }
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
  private componyNameDoesNotExist(control: FormControl) {
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
