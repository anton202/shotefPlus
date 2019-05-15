import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatDialog } from '@angular/material';
import { ConfirmActionComponent } from '../shared/confirm-action/confirm-action.component';

@Injectable({
    providedIn: 'root'
})
export class UserAreaService {
    apiUrl = environment.apiUrl;
    token = localStorage.getItem('token')
    headers = new HttpHeaders().set('Authorization',this.token);
    errorMessage = 'משהו השתבש, נסה שוב או פנה למפתח האתר.';
    statusMessage;
    isReportsFetched;
    constructor(private http: HttpClient, private dailog: MatDialog) { }

    confirmAction(text){
       const dialogRef = this.dailog.open(ConfirmActionComponent,{data:{text}});
       return dialogRef.afterClosed()
    }

    getRecords(){
         this.http.get(this.apiUrl,{headers: this.headers})
            .subscribe(()=>console.log('success'),error => {this.isReportsFetched = 'fail';this.statusMessage = this.errorMessage})
    }
   
    deleteReport(reportId){
        return this.http.delete(`${this.apiUrl}/${reportId}`,{headers: this.headers})
    }

    saveChanges(reportId,report){
       return this.http.put(`${this.apiUrl}/${reportId}`,report)
    }
}