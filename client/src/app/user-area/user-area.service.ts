import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatDialog } from '@angular/material';
import { ConfirmActionComponent } from '../confirm-action/confirm-action.component';

@Injectable({
    providedIn: 'root'
})
export class UserAreaService {
    apiUrl = environment.apiUrl;
    token = localStorage.getItem('token')
    headers = new HttpHeaders().set('Authorization',this.token);
    constructor(private http: HttpClient, private dailog: MatDialog) { }

    openConfirmationDialog(text){
       return this.dailog.open(ConfirmActionComponent,{data:{text}})
    }

    getRecords(){
        return this.http.get(this.apiUrl,{headers: this.headers})
    }
   
    deleteReport(reportId){
        return this.http.delete(`${this.apiUrl}/${reportId}`,{headers: this.headers})
    }
}