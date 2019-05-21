import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { registration } from './sign-up.model'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  apiUrl:string = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  public registerAccount(registretionValues: registration): Observable<any>{
    return this.http.post(this.apiUrl,registretionValues)
  }
}
