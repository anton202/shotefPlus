import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchBusinessService } from '../search-business/search-business.service';
import { environment } from '../../environments/environment';
import { flatMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SearchResultsService {
    apiUrl = environment.apiUrl;
    showSppiner = false;
    constructor(private http: HttpClient, private searchBusinessService: SearchBusinessService) { }

    searchCompanyRecords(companyName) {
        this.showSppiner = true;
        return this.http.get(`${this.apiUrl}/${companyName}`)
    }

    getCompanyRecords() {
        return this.searchBusinessService.companyName
            .pipe(flatMap(companyName => this.searchCompanyRecords(companyName)))
    }

}