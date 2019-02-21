import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  registerAccount(registretionValues){
    return this.http.post(this.apiUrl,registretionValues)
  }
}
