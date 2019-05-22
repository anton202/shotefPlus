import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  apiUrl:string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public login(loginValues:{email:string,password:string}):Observable<any>{
    return this.http.post(this.apiUrl,loginValues)
  }

}
