import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchBusinessService {
    byName: string = 'http://localhost:8081/findCompany/byName/';
   
   
    public reports: Subject<[{}]> = new Subject();

    constructor(private http: HttpClient) { }

    public requestCompanyNameFromApi(companyNameOrNumber: string): Observable<any> {
        
        return this.http.get<[string]>(this.byName + companyNameOrNumber)
    }

    public getCompnayReports(companyName: string): Observable<any> {
       return this.http.get<[{}]>('url') 
    }

}