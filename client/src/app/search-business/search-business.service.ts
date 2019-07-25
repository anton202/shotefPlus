import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchBusinessService {
    byName: string = 'http://companynamesapi-dev2.eu-central-1.elasticbeanstalk.com/findCompany/byName/';
    byNumber: string = 'http://companynamesapi-dev2.eu-central-1.elasticbeanstalk.com/findCompany/byNumber/'


    public reports: Subject<[{}]> = new Subject();

    constructor(private http: HttpClient) { }

    public requestCompanyNameFromApi(companyNameOrNumber: any): Observable<any> {
        if (isNaN(companyNameOrNumber)) {
            return this.http.get<[string]>(this.byName + companyNameOrNumber)
        } else {
            return this.http.get<[string]>(this.byNumber + companyNameOrNumber)
        }
    }

    public getCompnayReports(companyName: string): Observable<any> {
        return this.http.get<[{}]>('url')
    }

}