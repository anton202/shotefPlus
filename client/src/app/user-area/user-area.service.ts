import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { editReport } from '../shared/models/edit-report';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserAreaService {
    apiUrl = environment.apiUrl;
    token = localStorage.getItem('token')
    headers = new HttpHeaders().set('Authorization', this.token);

    constructor(private http: HttpClient) { }

    public getReports(): Observable<any> {
       return this.http.get(this.apiUrl, { headers: this.headers })   
    }

    public saveChanges(reportId: string, report: editReport): Observable<any> {
        return this.http.put(`${this.apiUrl}/${reportId}`, report)
    }

    public deleteReport(reportId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${reportId}`, { headers: this.headers })
    }

    public deleteEvidence(reportId: string, evidenceUrl: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${reportId}/${evidenceUrl}`, { headers: this.headers })
    }
}