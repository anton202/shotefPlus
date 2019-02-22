import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(loginValues){
    return this.http.post(this.apiUrl,loginValues)
  }

}
