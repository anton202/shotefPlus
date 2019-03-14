import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    isAuthenticated: boolean;
    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    authenticateUser() {
        // const token = localStorage.getItem('token')
        // if (token) {
        //     this.http.get(this.apiUrl, { headers: new HttpHeaders().set('Authorization', token) })
        //         .subscribe(() => this.isAuthenticated = true)
        // }
        setTimeout((()=>this.isAuthenticated = true),3000)
    }
}