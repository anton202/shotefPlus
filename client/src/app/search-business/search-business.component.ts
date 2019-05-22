import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SearchBusinessService } from './search-business.service';


@Component({
  selector: 'app-search-business',
  templateUrl: './search-business.component.html',
  styleUrls: ['./search-business.component.css']
})
export class SearchBusinessComponent implements OnInit {
  companyNameSuggestion: Array<any> = []
  searchCompanyNameForm: FormGroup;

  constructor(private searchBusinessService: SearchBusinessService) { }

  ngOnInit() {
    //initialize reactive form in ngOnInit for maitaining readabilety 
    this.searchCompanyNameForm = new FormGroup({
      'company_name': new FormControl(null, this.componyNameDoesNotExist.bind(this))
    })
  }

  public onSearchSubmit(): void {
    const companyName = this.searchCompanyNameForm.get('company_name').value;
    this.searchBusinessService.companyName.next(companyName);
  }

  public searchForCompanyName(): void {
    this.searchBusinessService.requestCompanyNameFromApi(this.searchCompanyNameForm.get('company_name').value)
      .subscribe(companyRecord => {
        console.log(companyRecord)
        this.companyNameSuggestion = companyRecord.result.records;
      },
        error => {
          console.log(error)
        })
  }

  //form control company_name validator
  private componyNameDoesNotExist(control: FormControl): {} | boolean {
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
