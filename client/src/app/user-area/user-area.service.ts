import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserAreaService {
    apiUrl = environment.apiUrl;
    token = localStorage.getItem('token')
    constructor(private http: HttpClient) { }

    getRecords(){
        return this.http.get(this.apiUrl,{headers: new HttpHeaders().set('Authorization',this.token)})
    }
   
}